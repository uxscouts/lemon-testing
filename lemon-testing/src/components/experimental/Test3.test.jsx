

import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
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





{/*
const availableTimes = ['23:00'];
const dispatch = () => {};

it('submits the form with correct data', async () => {
  const mockSubmit = vi.fn();
  const user = userEvent.setup();
  
  render(
    <BookingProvider>
      <BookingForm
        availableTimes={availableTimes}
        dispatch={dispatch}
        onChildSubmit={mockSubmit}
      />
    </BookingProvider>
  );


  const nameInput = screen.getByLabelText(/name/i);
  const emailInput = screen.getByLabelText(/email/i);
  const phoneInput = screen.getByLabelText(/phone/i);
  const guestsInput = screen.getByLabelText(/guests/i);
  const dateInput = screen.getByLabelText(/date/i);
  const timeInput = screen.getByRole('radio', { name: /23:00/ });

  await user.clear(nameInput);
  await user.clear(emailInput);
  await user.clear(phoneInput);
  await user.clear(guestsInput);

  await user.type(nameInput, 'John Doe');
  await user.type(emailInput, 'john@example.com');
  await user.type(phoneInput, '123-456-7890');
  await user.type(guestsInput, '2');
  await user.type(dateInput, '2024-12-25');
  await user.click(timeInput);


  await user.click(screen.getByRole('button', { name: /submit/i }));

  await waitFor(() => {
    expect(mockSubmit).toHaveBeenCalledTimes(1);
    expect(mockSubmit).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123-456-7890',
      guests: '2',
      date: '2024-12-25',
      time: '23:00',
    });
  });
});

*/}

{/*

// this code seems to validate but it SHOULD through an error!

test('shows error message when name is shorter than 3 characters', async () => {
  const user = userEvent.setup();

  
const availableTimes = ['23:00'];
const dispatch = () => {};


describe('submits the form with correct data', async () => {
  const mockSubmit = vi.fn();
  const user = userEvent.setup();
  
  render(
    <BookingProvider>
      <BookingForm
        availableTimes={availableTimes}
        dispatch={dispatch}
        onChildSubmit={mockSubmit}
      />
    </BookingProvider>
  );


  const input = screen.getByLabelText(/name/i);
  
  // Type an invalid name
  await user.type(input, 'Jo');
  
  const errorMessage = screen.getByRole('alert');
  expect(errorMessage).toHaveTextContent(/at least 3 characters/i);

  // Type a valid name to see if error disappears
  await user.type(input, 'e'); // Now "Joe"
  expect(screen.queryByRole('alert')).not.toBeInTheDocument();
});

  });

*/}


{/*

const availableTimes = ['23:00'];
const dispatch = () => {};

describe('Name Field Validation', () => {
  it('should be invalid when name is less than 2 characters', async () => {
    const mockSubmit = vi.fn();
    const user = userEvent.setup();

      render(
    <BookingProvider>
      <BookingForm
        availableTimes={availableTimes}
        dispatch={dispatch}
        onChildSubmit={mockSubmit}
      />
    </BookingProvider>
  );

    const nameInput = screen.getByLabelText(/name/i);
    await user.type(nameInput, 'Ayy');
    expect(nameInput.validity.tooShort).toBe(true);
    expect(nameInput.validity.valid).toBe(false);
  });

  it('should be valid when name is 2 or more characters', async () => {
    const mockSubmit = vi.fn();
    const user = userEvent.setup();

  render(
    <BookingProvider>
      <BookingForm
        availableTimes={availableTimes}
        dispatch={dispatch}
        onChildSubmit={mockSubmit}
      />
    </BookingProvider>
  );
    
    const nameInput = screen.getByLabelText(/name/i);
    await user.type(nameInput, 'ArB');
    await user.click(screen.getByRole('button', { name: /submit/i }));

    expect(nameInput.validity.tooShort).toBe(false);
    expect(nameInput.validity.valid).toBe(true);
  });
});

*/}

