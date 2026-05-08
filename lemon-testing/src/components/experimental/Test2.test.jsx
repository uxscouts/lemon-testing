import React from 'react'; // Add this line
import { render, screen } from '@testing-library/react';
import BookingForm from './BookingForm';
import { BookingProvider } from '../context/BookingContext';
import { fetchAPI } from "../API";

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
