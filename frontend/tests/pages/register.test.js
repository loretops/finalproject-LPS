/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RegisterPage from '../../pages/register'; // Adjust the path as needed
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';

// Mock the useRouter hook
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

// Mock the useAuth hook
jest.mock('../../context/AuthContext', () => ({
  useAuth: jest.fn(),
}));

// Mock the RegistrationForm component to check props
jest.mock('../../components/Auth/RegistrationForm', () => {
    return jest.fn(({ invitationToken, prefilledEmail }) => (
        <div data-testid="mock-registration-form">
            Mock Registration Form
            <span data-testid="token-prop">{invitationToken}</span>
            <span data-testid="email-prop">{prefilledEmail}</span>
        </div>
    ));
});

describe('RegisterPage', () => {
  const mockPush = jest.fn();
  const mockToken = 'valid-token';
  const mockEmail = 'valid@example.com';

  const setupMocks = (isAuthenticated, queryParams) => {
    useRouter.mockImplementation(() => ({
      push: mockPush,
      query: queryParams,
      isReady: true, // Assume router is ready
    }));
    useAuth.mockImplementation(() => ({ 
        isAuthenticated: isAuthenticated,
        loading: false // Assume auth loading is finished
    }));
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders RegistrationForm when not authenticated and token/email are present', () => {
    setupMocks(false, { token: mockToken, email: mockEmail });
    render(<RegisterPage />);

    expect(screen.getByText(/completa tu registro/i)).toBeInTheDocument();
    expect(screen.getByTestId('mock-registration-form')).toBeInTheDocument();
    // Check props passed to the mocked component
    expect(screen.getByTestId('token-prop')).toHaveTextContent(mockToken);
    expect(screen.getByTestId('email-prop')).toHaveTextContent(mockEmail);
    expect(mockPush).not.toHaveBeenCalled();
  });

  test('redirects to dashboard if user is already authenticated', async () => {
    setupMocks(true, { token: mockToken, email: mockEmail });
    render(<RegisterPage />);

    await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/dashboard');
    });
    // Check that the form is not rendered while redirecting
    expect(screen.queryByText(/completa tu registro/i)).not.toBeInTheDocument();
    expect(screen.getByText(/redirigiendo/i)).toBeInTheDocument();
  });

  test('shows error message if token is missing', () => {
    setupMocks(false, { email: mockEmail }); // Missing token
    render(<RegisterPage />);

    expect(screen.getByText(/enlace de registro inválido o incompleto/i)).toBeInTheDocument();
    expect(screen.queryByText(/completa tu registro/i)).not.toBeInTheDocument();
    expect(screen.queryByTestId('mock-registration-form')).not.toBeInTheDocument();
    expect(mockPush).not.toHaveBeenCalled();
  });

  test('shows error message if email is missing', () => {
    setupMocks(false, { token: mockToken }); // Missing email
    render(<RegisterPage />);

    expect(screen.getByText(/enlace de registro inválido o incompleto/i)).toBeInTheDocument();
    expect(screen.queryByText(/completa tu registro/i)).not.toBeInTheDocument();
    expect(screen.queryByTestId('mock-registration-form')).not.toBeInTheDocument();
    expect(mockPush).not.toHaveBeenCalled();
  });
}); 