import React from "react";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
});

const MyForm = () => (
  <Formik
    initialValues={{ email: '' }}
    validationSchema={SignupSchema}
    onSubmit={values => console.log(values)}
  >
    {({ isValid, dirty, isSubmitting }) => (
      <Form>
        <Field name="email" type="email" />
        
        <button 
          type="submit" 
          disabled={!(dirty && isValid) || isSubmitting}
        >
          Submit
        </button>
      </Form>
    )}
  </Formik>
);

export default MyForm;
