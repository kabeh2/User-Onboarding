// Render Prop
import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Your full name seems to be too short and incomplete")
    .max(50, "Your full name seems to be Too Long!")
    .required("Your full name is Required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Email is Required"),
  password: Yup.string()
    .min(2, "Password is Too Short!")
    .max(50, "Password is Too Long!")
    .required("No password provided.")
});

export const ValidationSchemaExample = () => (
  <div>
    <h1>Signup</h1>
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
        termsOfService: false
      }}
      validationSchema={SignupSchema}
      onSubmit={values => {
        // same shape as initial values
        console.log(values);
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <Field name="name" type="text" placeholder="Name..." />
          {errors.name && touched.name ? <div>{errors.name}</div> : null}
          <Field name="email" type="email" placeholder="Email..." />
          {errors.email && touched.email ? <div>{errors.email}</div> : null}
          <Field name="password" type="password" placeholder="Password..." />
          {errors.password && touched.password ? (
            <div>{errors.password}</div>
          ) : null}
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  </div>
);
