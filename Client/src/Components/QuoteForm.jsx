import React from 'react'
import { useState, useEffect } from "react";
import image from "./Assets/images/background_2.png"

import styled from "styled-components";
const QuoteForm = () => {
  const [gallonRequest, setGallonRequest] = useState(5);
  const [suggestPricePerGallon, setSuggestPricePerGallon] = useState(null);
  const [totalAmountDue, setTotalAmount] = useState(null);
  return (
    <Wrapper className="d-flex justify-content-center align-items-center"
    style={{
      backgroundImage: `url(${image})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
    }}>
    <div className="container border p-2 round-23 shadow-lg">
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
          placeholder="9999 NineRoad City State 77072"
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
          value={suggestPricePerGallon}
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
          value={totalAmountDue}
          disabled
        ></input>
      </div>
      <div className="p-2">
        <button className="col-12 btn btn-secondary rounded-0">Submit</button>
      </div>
    </div>
  </Wrapper>
  )
}
const Wrapper = styled.div`
  height: 80vh;
`;

export default QuoteForm