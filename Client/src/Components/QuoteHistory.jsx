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

function fuelHistory(
    id,
    gallonsRequested,
    deliveryAddress,
    deliveryDate,
    suggestedPricePerGallon,
    totalAmoutDue
  ) {
    return {
      gallonsRequested,
      deliveryAddress,
      deliveryDate,
      suggestedPricePerGallon,
      totalAmoutDue,
    };
  }
const QuoteHistory = () => {
    const [fuelHistory, setFuelHistory] = useState([
        {
          id: 1,
          gallonsRequested: 5,
          deliveryAddress: "999 Main St, City, State, Zipcode",
          deliveryDate: "2024-02-22",
          suggestedPricePerGallon: 10,
          totalAmountDue: 50,
        },
        {
          id: 2,
          gallonsRequested: 100,
          deliveryAddress: "888 Elm St, City, State, Zipcode",
          deliveryDate: "2024-02-23",
          suggestedPricePerGallon: 50,
          totalAmountDue: 5000,
        },
        {
          id: 3,
          gallonsRequested: 200,
          deliveryAddress: "777 Abram St, City, State, Zipcode",
          deliveryDate: "2024-02-23",
          suggestedPricePerGallon: 10,
          totalAmountDue: 2000,
        },
      ]);
  return (
    <Wrapper 
    style={{
      backgroundImage: `url(${image})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
    }}>
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
            <TableCell className="custom-cell">
              Suggested Price/ Gallon
            </TableCell>
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
  </Wrapper>
  )
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