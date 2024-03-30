import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './NavBar'; // Adjust the import path as needed

describe('NavBar Component', () => {
  const renderWithRouter = (NavBar) => {
    return render(<BrowserRouter>{NavBar}</BrowserRouter>);
  };

  test('contains a clickable "Home" link', () => {
    renderWithRouter(<NavBar />);
    const homeLink = screen.getByText("Home");
    expect(homeLink).toBeInTheDocument();
    fireEvent.click(homeLink);
    // Additional assertions as needed
  });

  test('contains a clickable "Quote Form" link', () => {
    renderWithRouter(<NavBar />);
    const quoteFormLink = screen.getByText("Quote Form");
    expect(quoteFormLink).toBeInTheDocument();
    fireEvent.click(quoteFormLink);
    // Additional assertions as needed
  });

  test('contains a clickable "Quote History" link', () => {
    renderWithRouter(<NavBar />);
    const quoteHistoryLink = screen.getByText("Quote History");
    expect(quoteHistoryLink).toBeInTheDocument();
    fireEvent.click(quoteHistoryLink);
    // Additional assertions as needed
  });

  test('contains a clickable "Profile" link', () => {
    renderWithRouter(<NavBar />);
    const profileLink = screen.getByText("Profile");
    expect(profileLink).toBeInTheDocument();
    fireEvent.click(profileLink);
    // Additional assertions as needed
  });
});