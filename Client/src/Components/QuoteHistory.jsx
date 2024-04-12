import React from 'react'
import { useState, useEffect } from "react";

import styled from "styled-components";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import image from "./Assets/images/background_2.png"
import { useAuth0 } from '@auth0/auth0-react';


const QuoteHistory = () => {
    const [fuelHistory, setFuelHistory] = useState([
      ]);

      const { user, isAuthenticated } = useAuth0();

      const userEmail = isAuthenticated && user?.email;

      
        //fetching data
   
      useEffect(() => {
        const fetchData = async () => {    
            console.log(userEmail); 
            const response = await fetch(`http://localhost:3500/quoteform/getquotehistory?userEmail=${userEmail}`);            
            if (!response.ok)
            {
              throw new Error('Fail to fetch Data')
            } else {
              const data = await response.json();
              setFuelHistory(data);
            }
        };  
        if (userEmail) 
        {
          fetchData(); 
        }    
                    
             
      }, [userEmail]);
      
      

      


    return (    
          <Wrapper 
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
            }}
          >
            {fuelHistory.length > 0 ? (
            <TableContainer className="custom-container col-lg-6" component={Paper}>
              <Table
                className="border round shadow-lg"
                sx={{ minWidth: 650 }}
                aria-label="Fuel Quote History"
              >
                <TableHead className="table-header">
                  <TableRow>
                    <TableCell className="custom-cell">Id</TableCell>
                    <TableCell className="custom-cell">Gallon Requested</TableCell>
                    <TableCell className="custom-cell">Delivery Address</TableCell>
                    <TableCell className="custom-cell">Delivery Date</TableCell>
                    <TableCell className="custom-cell">Suggested Price/ Gallon</TableCell>
                    <TableCell className="custom-cell">Total Amount Due</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {fuelHistory.map((history, index) => (
                    <TableRow key={history.id}>
                      <TableCell>{history.id}</TableCell>
                      <TableCell>{history.gallonsRequested}</TableCell>
                      <TableCell>{history.deliveryAddress}</TableCell>
                      <TableCell>{history.deliveryDate}</TableCell>
                      <TableCell>{history.suggestedPricePerGallon}</TableCell>
                      <TableCell>{history.totalAmountDue}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            ): (
              <div>No fuel history available.</div>
            )}
          </Wrapper>
    );
    
}
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  .custom-container {
    width: 90%;
    max-width: ;
    margin: 0 auto;
  }
  .custom-cell {
    background-color: black;
    color: white;
    font-size: 40;
    font-weight: bold;
  }
  .tableHeader {
  }
`;
export default QuoteHistory