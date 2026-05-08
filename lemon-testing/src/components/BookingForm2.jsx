import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button, Table, Container } from "reactstrap";
import { useBooking } from "../context/BookingContext";


function BookingForm2({  
  onChildSubmit
}) {

  const { booking, updateBooking } = useBooking();
  const [name, setName] = useState(booking.name || "");
  const [email, setEmail] = useState(booking.email || "");
  const [phone, setPhone] = useState(booking.phone || "123-456-7890");
  const [guests, setGuests] = useState(booking.guests || "4");
  

  const handleSubmit2 = (event) => {
    event.preventDefault(); // Stop reload
    const data = new FormData(event.target);
    const value = Object.fromEntries(data.entries()); // Convert to object
    updateBooking(value.name, value.email, value.phone, value.guests);
    onChildSubmit(value); // Send up to parent
  };


  return (
    <>
    <h1 id="booking-title">Reservation Form</h1>
      <div className="BookingFormContainer">
        <Form
          className="BookingForm"
          aria-labelledby="booking-title"
          onSubmit={handleSubmit2}
        >
          <FormGroup>
            <Label htmlFor="name" id="label-name">Full Name:</Label>
            <Input 
             id="res-name" 
              name="name" 
              type="text" 
              placeholder="Name" 
              aria-required="true"
              aria-labelledby="label-name"
              required
              /*
              minLength="2" 
              maxLength="30" 
              pattern="[a-zA-Z\s]+"
              */ 
              title="Name should only contain letters and spaces"               
              value={name}
              onChange={(e) => setName(e.target.value)}                     
            />            
          </FormGroup>
          <FormGroup>
            <Label htmlFor="email" id="label-email">Email address:</Label>
            <Input 
              name="email" 
              type="email" 
              placeholder="Email" 
              aria-required="true"
              aria-labelledby="label-email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}                     
            />             
           </FormGroup>
           <FormGroup>
            <Label htmlFor="phone" id="label-phone">Phone number (Format: 123-456-7890):</Label>
            <Input 
              name="phone" 
              type="tel" 
              aria-required="true" 
              aria-labelledby="label-phone"
              required
              /*
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              placeholder="123-456-7890"
              */
              title="Phone number must be in the format 123-456-7890"               
              value={phone}
              onChange={(e) => setPhone(e.target.value)}                     
            />             
           </FormGroup> 
           <FormGroup>
            <Label htmlFor="guests" id="label-guests">Guests (2-8):</Label>
            <Input 
              name="guests" 
              type="number" 
              id="guests"
              /* 
              min="2" 
              max="8"
              */               
              placeholder="2" 
              aria-required="true"
              aria-labelledby="label-guests"
              required  
              value={guests}
              onChange={(e) => setGuests(e.target.value)}                     
            />             
           </FormGroup> 
          <Button role="button" type="submit">submit</Button>
        </Form>
        </div>
    </>
  );
}

export default BookingForm2;

