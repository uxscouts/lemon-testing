import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import SignupForm from './TestForm3';

describe('SignupForm', () => {
  it('renders all form fields', () => {
    render(<SignupForm />);
    
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('updates input values on change', async () => {
    const user = userEvent.setup();
    render(<SignupForm />);
    
    const firstNameInput = screen.getByLabelText(/first name/i);
    
    await user.type(firstNameInput, 'John');
    expect(firstNameInput.value).toBe('John');
  });

  it('submits the form with correct values', async () => {
    const user = userEvent.setup();
    
    // Mock the window.alert since the form uses it
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});
    
    render(<SignupForm />);

    // Fill out the form
    await user.type(screen.getByLabelText(/first name/i), 'Jane');
    await user.type(screen.getByLabelText(/last name/i), 'Doe');
    await user.type(screen.getByLabelText(/email address/i), 'jane@example.com');
    
    // Click submit
    await user.click(screen.getByRole('button', { name: /submit/i }));

    // Check if alert was called with the right data
    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith(
        JSON.stringify({
          firstName: 'Jane',
          lastName: 'Doe',
          email: 'jane@example.com'
        }, null, 2)
      );
    });

    alertMock.mockRestore();
  });
});
