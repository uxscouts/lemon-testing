
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import SignupForm from './TestForm3';


it('displays error messages when fields are left empty', async () => {
  const user = userEvent.setup();
  render(<SignupForm />);
  
  // Click submit without entering data
  await user.click(screen.getByRole('button', { name: /submit/i }));

  // Use findBy to wait for the async validation to finish
  expect(await screen.findByText(/first name is required/i)).toBeInTheDocument();
  expect(await screen.findByText(/last name is required/i)).toBeInTheDocument();
  expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
});


it('shows an error for an invalid email format', async () => {
  const user = userEvent.setup();
  render(<SignupForm />);
  
  const emailInput = screen.getByLabelText(/email address/i);
  
  // Type bad data
  await user.type(emailInput, 'not-an-email');
  
  // Formik often validates on blur or on submit
  await user.tab(); // Blur the field to trigger validation

  // Wait for the specific error message to appear
  expect(await screen.findByText(/invalid email/i)).toBeInTheDocument();
});

// check that the form does not submit when there are validation errors
it('does not submit the form if validation fails', async () => {
  const user = userEvent.setup();
  const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});
  
  render(<SignupForm />);
  
  // Fill only part of the form
  await user.type(screen.getByLabelText(/first name/i), 'Jane');
  await user.click(screen.getByRole('button', { name: /submit/i }));

  // Wait a tick to ensure Formik had time to process
  await waitFor(() => {
    expect(alertMock).not.toHaveBeenCalled();
  });
  
  alertMock.mockRestore();
});
