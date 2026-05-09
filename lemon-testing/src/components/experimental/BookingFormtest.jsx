import react from 'react';
import { render, screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import BookingForm from './BookingForm';
import { BookingProvider } from '../context/BookingContext';

test('checks if text exists', () => {
  const mockDispatch = vi.fn();
  const availableTimes = [];

  render(
    <BookingProvider>
      <BookingForm availableTimes={availableTimes} dispatch={mockDispatch} />
    </BookingProvider>
  );
  
  // Check for Reservation Form heading
  const headingElement = screen.getByText("Reservation Form");
  expect(headingElement).toBeInTheDocument();

  // Check for a form element
  const formElement = screen.getByRole("form");
  expect(formElement).toBeInTheDocument();
});