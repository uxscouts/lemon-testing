import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import BookingForm from './BookingForm';
import { BookingProvider } from '../context/BookingContext';
import { fetchAPI } from "../API";

const availableTimes = [];
const dispatch = () => {};

describe('TestForm Component', () => {
  it('submits the form with correct data', async () => {
    // 1. Create the Spy
    const handleSubmit = vi.fn();

    // 2. Render and PASS the spy as a prop
    render(
      <BookingProvider>
        {/* Make sure to pass handleSubmit here! */}
        <BookingForm 
          availableTimes={['17:00', '18:00']} 
          dispatch={dispatch} 
          onChildSubmit={handleSubmit} 
        />
      </BookingProvider>
    );

    // 3. Interact
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const phoneInput = screen.getByLabelText(/phone/i);
    const guestsInput = screen.getByLabelText(/guests/i);
    const dateInput = screen.getByLabelText(/booking date/i);
    const timeSelect = screen.getByLabelText(/time/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });
      

    await userEvent.type(nameInput, 'John Doe');
    await userEvent.type(emailInput, 'john@example.com');
    await userEvent.type(phoneInput, '123-456-7890');
    await userEvent.type(guestsInput, '2');
    await userEvent.type(dateInput, '2026-05-07'); 
    await userEvent.selectOptions(timeSelect, '17:00');
    await userEvent.click(submitButton);

    // 4. Assert with arguments
    // Ensure the data structure matches what your component sends (e.g., an object)
    expect(handleSubmit).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123-456-7890',
      guests: '2',
      date: '2026-05-07',
      time: '17:00'
    }); 
  });
});
