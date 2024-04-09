import LoginButton from './LoginButton'
import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react'

jest.mock('@auth0/auth0-react', () => ({
    useAuth0: () => ({
        isAuthenticated: false,
        loginWithRedirect: jest.fn(),
    }),
}));

describe('LoginButton', () => {
    test('calls loginWithRedirect on button click', () => {
      const { loginWithRedirect } = require('@auth0/auth0-react').useAuth0();
  
      render(<LoginButton />);
  
      const button = screen.getByRole('button', { name: /log in/i });
      fireEvent.click(button);
  
      expect(loginWithRedirect).toHaveBeenCalled();
    });
  });