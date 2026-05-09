
/// this one takes bad data

import React from "react";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import BookingForm from './BookingForm2';

describe('BookingForm Validation', () => {
  
  it('renders all form fields correctly', () => {
    render(<BookingForm />);
    expect(screen.getByLabelText(/Full Name:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email address:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Guests/i)).toBeInTheDocument();
  });

  it('shows error messages for invalid "bad data" inputs', async () => {
    render(<BookingForm />);

    // 1. Enter bad name (numbers)
    fireEvent.change(screen.getByLabelText(/Full Name:/i), { target: { value: 'John123' } });
    fireEvent.blur(screen.getByLabelText(/Full Name:/i));

    // 2. Enter bad email
    fireEvent.change(screen.getByLabelText(/Email address:/i), { target: { value: 'not-an-email' } });
    fireEvent.blur(screen.getByLabelText(/Email address:/i));

    // 3. Enter bad phone format
    fireEvent.change(screen.getByLabelText(/Phone/i), { target: { value: '1234567890' } });
    fireEvent.blur(screen.getByLabelText(/Phone/i));

    // 4. Enter guest count out of range
    fireEvent.change(screen.getByLabelText(/Guests/i), { target: { value: '10' } });
    fireEvent.blur(screen.getByLabelText(/Guests/i));

    // Validation is async in Formik/Yup
    await waitFor(() => {
      expect(screen.getByText(/Name should only contain letters and spaces/i)).toBeInTheDocument();
      expect(screen.getByText(/Invalid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Format must be 123-456-7890/i)).toBeInTheDocument();
      expect(screen.getByText(/Maximum 8 guests/i)).toBeInTheDocument();
    });

    // Ensure submit button is disabled
    const submitBtn = screen.getByRole('button', { name: /submit/i });
    expect(submitBtn).toBeDisabled();
  });

  it('enables the submit button with valid data', async () => {
    render(<BookingForm />);

    fireEvent.change(screen.getByLabelText(/Full Name:/i), { target: { value: 'Jane Doe' } });
    fireEvent.change(screen.getByLabelText(/Email address:/i), { target: { value: 'jane@xample.com' } });
    fireEvent.change(screen.getByLabelText(/Phone/i), { target: { value: '123-456-7890' } });
    fireEvent.change(screen.getByLabelText(/Guests/i), { target: { value: '4' } });

    await waitFor(() => {
      const submitBtn = screen.getByRole('button', { name: /submit/i });
      expect(submitBtn).not.toBeDisabled();
    });
  });

});








/*

import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import BookingForm from './BookingForm2';
import { BookingProvider } from '../context/BookingContext';
import { fetchAPI } from "../API";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
// import SignupForm from './TestForm3';


const availableTimes = [];
const dispatch = () => {};

test('renders specific text', () => {
   render(
       <BookingProvider>
        <BookingForm 
          availableTimes={availableTimes} 
          dispatch={dispatch} 
        />
       </BookingProvider>
 )

  // Throws error if text is not found exactly
  const element = screen.getByText('Reservation Form');
  expect(element).toBeInTheDocument();
});


//////////////////////////////////////////////////////////////////////////



describe("SignupForm Validation", () => {
  
  // Helper to fill and blur fields
  const fillField = async (label, value) => {
    const input = screen.getByLabelText(label);
    await userEvent.type(input, value);
    fireEvent.blur(input); // Trigger Formik validation
  };

  it("should show error messages for empty required fields", async () => {
    render(
       <BookingProvider>
        <BookingForm 
          availableTimes={availableTimes} 
          dispatch={dispatch} 
        />
       </BookingProvider>
    )
    
    const submitButton = screen.getByRole("button", { name: /submit/i });
    await userEvent.click(submitButton);

    expect(await screen.findAllByText(/required/i)).toHaveLength(3);
  });

  it("should show error for long first names (bad data)", async () => {

    render(
       <BookingProvider>
        <BookingForm 
          availableTimes={availableTimes} 
          dispatch={dispatch} 
        />
       </BookingProvider>
    )
    
    await fillField(/first name/i, "ThisNameIsWayTooLongForTheSchema");
    
    expect(await screen.findByText(/must be 15 characters or less/i)).toBeInTheDocument();
  });

  it("should show error for invalid email formats (bad data)", async () => {
    render(
        render(
       <BookingProvider>
        <BookingForm 
          availableTimes={availableTimes} 
          dispatch={dispatch} 
        />
       </BookingProvider>
    )
);
    
    await fillField(/email address/i, "not-an-email");
    
    expect(await screen.findByText(/invalid email address/i)).toBeInTheDocument();
  });

  it("should submit successfully with valid data", async () => {
    window.alert = vi.fn(); // Mock alert

        render(
       <BookingProvider>
        <BookingForm 
          availableTimes={availableTimes} 
          dispatch={dispatch} 
        />
       </BookingProvider>
    )

    await userEvent.type(screen.getByLabelText(/first name/i), "Jane");
    await userEvent.type(screen.getByLabelText(/last name/i), "Doe");
    await userEvent.type(screen.getByLabelText(/email address/i), "jane@example.com");
    
    await userEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalled();
    });
  });
});

*/


