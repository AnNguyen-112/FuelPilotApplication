import React from 'react'
import { useState, useEffect } from "react";
import image from "./Assets/images/background_2.png"
import { useAuth0 } from '@auth0/auth0-react';

import styled from "styled-components";
const QuoteForm = () => {
  const [gallonRequested, setGallonRequested] = useState(0);
  const [suggestedPricePerGallon, setSuggestedPricePerGallon] = useState(0);
  const [total, setTotal] = useState(0);
  const [deliveryAddress, setDeliveryAddress] = useState("");

  //for date
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const [deliveryDate, setDeliveryDate] = useState(yesterday);

  const { user, isAuthenticated } = useAuth0();

  const userEmail = isAuthenticated && user?.email;


 
    

    const handleSubmitQuoteForm = async(e) => {
      e.preventDefault();
      // future assigment quote form module after receive a price  
      const response = await fetch("http://localhost:3500/quoteform",{
        method:'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userEmail: userEmail,
          gallonRequested: gallonRequested,
          deliveryAddress: deliveryAddress,
          deliveryDate: deliveryDate,
          suggestedPricePerGallon: suggestedPricePerGallon,
          totalAmountDue: total,
        }),
      })

      if (!response.ok){
        throw new Error('Failed to fetch Data');
      };
      const data = await response.json();
      console.log(data);
      

    }

    const handleSubmitPrice = async(e) => {
        
        e.preventDefault();
        console.log(deliveryDate);
        const response = await fetch("http://localhost:3500/pricing",{
          method:'POST',
          headers:{
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userEmail: userEmail,
            gallonRequested: gallonRequested,           
            deliveryDate: deliveryDate,
          }),
        });

        if (!response.ok){
          throw new Error('Failed to fetch Data');
        };
        const data = await response.json();
        console.log(data);
        setSuggestedPricePerGallon(data.Pricing.suggestedPricePerGallon);
        setTotal(data.Pricing.total);
        setDeliveryAddress(data.Pricing.userAddress);
      
    }


  

  return (
    <Wrapper className="d-flex justify-content-center align-items-center"
    style={{
      backgroundImage: `url(${image})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
    }}>
    <form className="container border p-2 round-23 shadow-lg bg-light">
      <div className="m-2">
        <input type="hidden" id="userEmail" name="userEmail" defaultValue={userEmail}/>
      </div>
      <div className="m-2">
        <label
          htmlFor="gallonRequest"
          className="form-label col-12 text-start  fw-bold"
          required
        >
          Gallons Requested (Numeric Only)
        </label>
        <input
          type="number"
          step="0.1"
          className="form-control col-sm-12"
          id="gallonRequestFormControlInput"
          required
          onChange={(e) => setGallonRequested(e.target.value)}
        ></input>
      </div>
      <div className="m-2">
        <label
          htmlFor="deliveryAddress"
          className="form-label col-12 text-start  fw-bold"
        >
          Delivery Address
        </label>
        <input
          type="text"
          className="form-control"
          // placeholder=""
          value={deliveryAddress}
          disabled
          id="deliveryAddressFormControlInput"
        ></input>
      </div>
      <div className="m-2">
        <label
          htmlFor="deliveryDate"
          className="form-label col-12 text-start  fw-bold"
        >
          Delivery Date
        </label>
        <input
          type="date"
          className="form-control"
          id="deliveryDateFormControlInput"
          required
        ></input>
      </div>
      <div className="m-2">
        <label
          htmlFor="suggestPriceGallons"
          className="form-label col-12 text-start fw-bold"
        >
          Suggested Price / Gallon
        </label>
        <input
          type="number"
          className="form-control"
          id="suggestPricePerGallonsFormControlInput fw-bold"
          placeholder=""
          value={suggestedPricePerGallon}
          disabled
        ></input>
      </div>
      <div className="m-2">
        <label
          htmlFor="totalAmountDue"
          className="form-label col-12 text-start fw-bold"
        >
          Total Amount Due
        </label>
        <input
          type="number"
          className="form-control"
          id="totalAmountDueFormControlInput"
          value={total}
          disabled
        ></input>
      </div>
      <div className="p-2 d-flex justify-content-between">
        <button className="col-6 btn btn-dark rounded-0 me-1" type="submit" onClick={handleSubmitQuoteForm}>Submit</button>
        
        <button 
        className="col-6  btn btn-dark rounded-0 ms-1" 
        type="submit"  
        onClick={handleSubmitPrice}
        disabled={gallonRequested <= 0 || deliveryDate >= yesterday}
        >
          Checking price</button>
      </div>
    </form>
  </Wrapper>
  )
}
const Wrapper = styled.div`
  height: 80vh;

  
`;

export default QuoteForm