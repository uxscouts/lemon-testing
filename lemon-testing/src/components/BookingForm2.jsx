
import React from 'react';
import { useFormik } from 'formik';
import { Form as BootstrapForm, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';
import * as Yup from 'yup';

const bookingSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, "Name should only contain letters and spaces")
    .required("Full name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^\d{3}-\d{3}-\d{4}$/, "Format must be 123-456-7890")
    .required("Phone number is required"),
  guests: Yup.number()
    .min(2, "Minimum 2 guests")
    .max(8, "Maximum 8 guests")
    .required("Number of guests is required"),
});


const BookingForm = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      guests: 2,
    },
    validationSchema: bookingSchema,
    onSubmit: (values) => {
      console.log('Form Data:', values);
      // Your handleSubmit2 logic goes here
      const stringifiedData = JSON.stringify(values);
      alert(stringifiedData);
    },
  });


  return (
    <BootstrapForm className="BookingForm" onSubmit={formik.handleSubmit}>
      <FormGroup>
        <Label htmlFor="name">Full Name:</Label>
        <Input
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          invalid={formik.touched.name && !!formik.errors.name}
        />
        <FormFeedback>{formik.errors.name}</FormFeedback>
      </FormGroup>

      <FormGroup>
        <Label htmlFor="email">Email address:</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          invalid={formik.touched.email && !!formik.errors.email}
        />
        <FormFeedback>{formik.errors.email}</FormFeedback>
      </FormGroup>

      <FormGroup>
        <Label htmlFor="phone">Phone (123-456-7890):</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phone}
          invalid={formik.touched.phone && !!formik.errors.phone}
        />
        <FormFeedback>{formik.errors.phone}</FormFeedback>
      </FormGroup>

      <FormGroup>
        <Label htmlFor="guests">Guests (2-8):</Label>
        <Input
          id="guests"
          name="guests"
          type="number"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.guests}
          invalid={formik.touched.guests && !!formik.errors.guests}
        />
        <FormFeedback>{formik.errors.guests}</FormFeedback>
      </FormGroup>

    <Button 
        type="submit" 
        color="primary" 
        disabled={!(formik.isValid && formik.dirty)}
      >Submit
      </Button>


    </BootstrapForm>
  );
};

export default BookingForm;

