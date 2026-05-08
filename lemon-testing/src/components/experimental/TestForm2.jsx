import React, { useState } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Table,
  Container,
} from "reactstrap";
import { useBooking } from "../context/BookingContext";

function TestForm2() {
  return (
    <>
      <Form>
        <FormGroup>
          <Label htmlFor="name" id="label-name">
            Full Name:
          </Label>
          <Input
            id="res-name"
            name="name"
            type="text"
            placeholder="Name"
            aria-required="true"
            aria-labelledby="label-name"
            minLength="2"
            maxLength="30"
            pattern="[a-zA-Z\s]+"
            title="Name should only contain letters and spaces"
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="email" id="label-email">
            Email address:
          </Label>
          <Input
            name="email"
            type="email"
            placeholder="Email"
            aria-required="true"
            aria-labelledby="label-email"
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="phone" id="label-phone">
            Phone number (Format: 123-456-7890):
          </Label>
          <Input
            name="phone"
            type="tel"
            aria-required="true"
            aria-labelledby="label-phone"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            placeholder="123-456-7890"
            title="Phone number must be in the format 123-456-7890"
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="guests" id="label-guests">
            Guests (2-8):
          </Label>
          <Input
            name="guests"
            type="number"
            id="guests"
            min="2"
            max="8"
            placeholder="2"
            aria-required="true"
            aria-labelledby="label-guests"
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="date" id="label-date">
            Booking Date (Max 2-month advance):
          </Label>
          <Input
            id="date"
            name="date"
            type="date"
            placeholder="Guests"
            aria-required="true"
            aria-labelledby="label-date"
          />
        </FormGroup>
        <Button role="button" type="submit">
          Add Another
        </Button>
        <Button role="button" type="submit">
          submit
        </Button>
      </Form>
    </>
  );
}

export default TestForm2;
