import React from 'react';
import { render, screen } from '@testing-library/react';
import QuoteForm from './QuoteForm'; // Adjust the import path as needed

describe('QuoteForm Component', () => {
  test('renders the "Gallons Requested" label', () => {
    render(<QuoteForm />);
    const gallonsRequestedLabel = screen.getByText("Gallons Requested (Numeric Only)");
    expect(gallonsRequestedLabel).toBeInTheDocument();
  });

  test('renders the "Delivery Address" label', () => {
    render(<QuoteForm />);
    const deliveryAddressLabel = screen.getByText("Delivery Address");
    expect(deliveryAddressLabel).toBeInTheDocument();
  });

  test('renders the "Delivery Date" label', () => {
    render(<QuoteForm />);
    const deliveryDateLabel = screen.getByText("Delivery Date");
    expect(deliveryDateLabel).toBeInTheDocument();
  });

  test('renders the "Suggested Price / Gallon" label', () => {
    render(<QuoteForm />);
    const suggestedPriceLabel = screen.getByText("Suggested Price / Gallon");
    expect(suggestedPriceLabel).toBeInTheDocument();
  });

  test('renders the "Total Amount Due" label', () => {
    render(<QuoteForm />);
    const totalAmountDueLabel = screen.getByText("Total Amount Due");
    expect(totalAmountDueLabel).toBeInTheDocument();
  });
});
