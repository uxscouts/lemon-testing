
import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import BookingForm from './BookingForm';
import { BookingProvider } from '../context/BookingContext';
import { fetchAPI } from "../API";
import TestForm from './TestForm';

describe('TestForm Component', () => {
  it('submits the form with correct data', async () => {
    // 1. Mock the onSubmit prop function
    const handleSubmit = vi.fn();
    
    // 2. Render only this component
    render(<TestForm onSubmit={handleSubmit} />);
    
    // 3. Interact with the component (user-event)
    const nameInput = screen.getByLabelText(/name/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });
    
    await userEvent.type(nameInput, 'John Doe');
    await userEvent.click(submitButton);
    
    // 4. Assert behavior
    expect(handleSubmit).toHaveBeenCalledWith('John Doe');
  });
});
