import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button, Table, Container } from "reactstrap";
import { useBooking } from "../context/BookingContext";


function BookingForm({ 
  availableTimes,
  dispatch, 
 // onSubmit, 
 // onSendData,  
  onChildSubmit
}) {
  const { booking, updateBooking } = useBooking();
  const [name, setName] = useState(booking.name || "Joe Smith");
  const [email, setEmail] = useState(booking.email || "something@example.com");
  const [phone, setPhone] = useState(booking.phone || "123-456-7890");
  const [guests, setGuests] = useState(booking.guests || "4");
  const [date, setDate] = useState(booking.date || "");
  const [time, setTime] = useState(booking.time || "");

  // for the date field to set earliest and latest date for Reservation 
  const today = new Date().toISOString().split('T')[0];
  const maxDateObj = new Date();
  maxDateObj.setMonth(maxDateObj.getMonth() + 2);
  const maxDate = maxDateObj.toISOString().split('T')[0];



  // use function uses Reducer to send data to parent
  // but it is different becuase it sends values via
  // onSubmit (so I can simulateously creaete local State 
  // with onChange)
  const handleSubmit2 = (event) => {
    event.preventDefault(); // Stop reload
    const data = new FormData(event.target);
    const value = Object.fromEntries(data.entries()); // Convert to object
    updateBooking(value.name, value.email, value.phone, value.guests, value.date, value.time);
    onChildSubmit(value); // Send up to parent
  };



// this if for Reducer Update Times only
// and this happens locally but onChange 
// so values are dictated by date change
// dont need this because I switched to the onSubmit for 
// form REDUCER

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
    dispatch({ type: "UPDATE_TIMES", payload: selectedDate });
  };

  const handleTimeChange = (e) => {
    const selectedTime = e.target.value;
    setTime(selectedTime);
  };

  return (
    <>
    <Container className="mt-5 p-3 custom-border">
      <h1 id="booking-title">Reservation Form</h1>
      <div className="BookingFormContainer">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Guests</th>
            <th>Date</th>
            <th>Time</th>          
          </tr>
        </thead>
        <tbody>
            <tr>
              <td>{name}</td>
              <td>{email}</td>
              <td>{phone}</td>
               <td>{guests}</td>
              <td>{date}</td>
              <td>{time}</td>             
            </tr>
        </tbody>
        </Table>
        </div>
      </Container>
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
              minLength="2" 
              maxLength="30" 
              pattern="[a-zA-Z\s]+" 
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
              required
              aria-required="true"
              aria-labelledby="label-email"  
              value={email}
              onChange={(e) => setEmail(e.target.value)}                     
            />             
           </FormGroup>
           <FormGroup>
            <Label htmlFor="phone" id="label-phone">Phone number (Format: 123-456-7890):</Label>
            <Input 
              name="phone" 
              type="tel" 
              required
              aria-required="true" 
              aria-labelledby="label-phone"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              placeholder="123-456-7890"
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
              min="2" 
              max="8"               
              placeholder="2" 
              required
              aria-required="true"
              aria-labelledby="label-guests"  
              value={guests}
              onChange={(e) => setGuests(e.target.value)}                     
            />             
           </FormGroup> 
           <FormGroup>
            <Label htmlFor="date" id="label-date">Booking Date (Max 2-month advance):</Label>
            <Input 
              id="date"
              name="date" 
              type="date" 
              placeholder="Guests" 
              min={today}
              max={maxDate} 
              value={date}
              onChange={handleDateChange}
              required
              aria-required="true"
              aria-labelledby="label-date"                                   
            />             
           </FormGroup>
            <FormGroup tag="fieldset">
              <legend>Time</legend> 
              <div className="box" role="radiogroup" aria-label="select-time">
                {availableTimes.map((timeOption) => (
                  <div key={timeOption} className="timeOptions">
                    <input 
                      type="radio" 
                      id={timeOption} 
                      name="time"                        
                      value={timeOption} 
                      onChange={handleTimeChange} 
                      aria-labelledby={timeOption}
                      required 
                    />
                    <label id={timeOption} htmlFor={timeOption}>{timeOption}</label>
                  </div>
                ))}
              </div>
            </FormGroup>
          <Button role="button" type="submit">Add Another</Button>                                              
          <Button role="button" type="submit">submit</Button>
        </Form>
        </div>
    </>
  );
}

export default BookingForm;

