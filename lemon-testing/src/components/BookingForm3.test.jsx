/// this one takes bad data

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from '@testing-library/user-event';
import BookingForm from "./BookingForm3";
import { BookingProvider } from '../context/BookingContext';
import { fetchAPI } from "../API";


const availableTimes = [];
const dispatch = () => {};
const handleSubmit = vi.fn();


describe('BookingForm Input Validation', () => {
  it('updates input values on change', () => {
    render(
         <BookingProvider>
        <BookingForm 
          availableTimes={['17:00', '18:00']} 
          dispatch={dispatch} 
          onChildSubmit={handleSubmit} 
        />
      </BookingProvider>
    );
    

    expect(screen.getByLabelText(/Full Name:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email address:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Guests/i)).toBeInTheDocument();
  });

  it('shows error messages for invalid "bad data" inputs', async () => {
    render(
      <BookingProvider>
        <BookingForm
          availableTimes={["17:00", "18:00"]}
          dispatch={dispatch}
          onChildSubmit={handleSubmit}
        />
      </BookingProvider>
    );

    // 1. Enter bad name (numbers)
    fireEvent.change(screen.getByLabelText(/Full Name:/i), {
      target: { value: "John123" },
    });
    fireEvent.blur(screen.getByLabelText(/Full Name:/i));

    // 2. Enter bad email
    fireEvent.change(screen.getByLabelText(/Email address:/i), {
      target: { value: "not-an-email" },
    });
    fireEvent.blur(screen.getByLabelText(/Email address:/i));

    // 3. Enter bad phone format
    fireEvent.change(screen.getByLabelText(/Phone/i), {
      target: { value: "1234567890" },
    });
    fireEvent.blur(screen.getByLabelText(/Phone/i));

    // 4. Enter guest count out of range
    fireEvent.change(screen.getByLabelText(/Guests/i), {
      target: { value: "10" },
    });
    fireEvent.blur(screen.getByLabelText(/Guests/i));

    // Validation is async in Formik/Yup
    await waitFor(() => {
      expect(
        screen.getByText(/Name should only contain letters and spaces/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/Invalid email address/i)).toBeInTheDocument();
      expect(
        screen.getByText(/Format must be 123-456-7890/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/Maximum 8 guests/i)).toBeInTheDocument();
    });

    // Ensure submit button is disabled
    const submitBtn = screen.getByRole("button", { name: /submit/i });
    expect(submitBtn).toBeDisabled();
  });

  it("enables the submit button with valid data", async () => {
    render(
      <BookingProvider>
        <BookingForm
          availableTimes={["17:00", "18:00"]}
          dispatch={dispatch}
          onChildSubmit={handleSubmit}
        />
      </BookingProvider>
    );

    fireEvent.change(screen.getByLabelText(/Full Name:/i), {
      target: { value: "Jane Doe" },
    });
    fireEvent.change(screen.getByLabelText(/Email address:/i), {
      target: { value: "jane@xample.com" },
    });
    fireEvent.change(screen.getByLabelText(/Phone/i), {
      target: { value: "123-456-7890" },
    });
    fireEvent.change(screen.getByLabelText(/Guests/i), {
      target: { value: "4" },
    });

    await waitFor(() => {
      const submitBtn = screen.getByRole("button", { name: /submit/i });
      expect(submitBtn).not.toBeDisabled();
    });
  });
});
