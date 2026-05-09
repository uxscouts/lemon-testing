import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup"; // 1. Import Yup
import { Container, Row, Col } from "react-bootstrap";

const SignupForm = () => {
  // 2. Define the validation schema
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    lastName: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
    validationSchema, // 3. Add schema here
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Container className="p-3">
        <Row>
          <Col className="p-2">
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              {...formik.getFieldProps("firstName")} // 4. Helper for cleaner code
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <div style={{ color: "red" }}>{formik.errors.firstName}</div>
            ) : null}
          </Col>
        </Row>

        <Row>
          <Col className="p-2">
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              {...formik.getFieldProps("lastName")}
            />
            {formik.touched.lastName && formik.errors.lastName ? (
              <div style={{ color: "red" }}>{formik.errors.lastName}</div>
            ) : null}
          </Col>
        </Row>

        <Row>
          <Col className="p-2">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email ? (
              <div style={{ color: "red" }}>{formik.errors.email}</div>
            ) : null}
          </Col>
        </Row>

        <Row>
          <Col className="p-2">
            <button type="submit">Submit</button>
          </Col>
        </Row>
      </Container>
    </form>
  );
};

export default SignupForm;
