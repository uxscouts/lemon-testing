import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import BookingForm from './BookingForm';
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
    
    const nameInput = screen.getByLabelText(/full name/i);
    fireEvent.change(nameInput, { target: { value: 'James' } });
    screen.debug(nameInput); // Prints only the specific input element
    expect(nameInput.value).toBe('James');
  });

});
