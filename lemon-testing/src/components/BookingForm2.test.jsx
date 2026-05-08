
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




