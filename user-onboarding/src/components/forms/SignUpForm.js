import React from "react";
import { Form, Field } from "formik";

const SignUpForm = ({ errors, touched, values, isSubmitting }) => (
  <div>
    <h1>Signup</h1>

    <Form>
      <Field name="name" type="text" placeholder="Name..." />
      {errors.name && touched.name && <div>{errors.name}</div>}
      <Field name="email" type="email" placeholder="Email..." />
      {errors.email && touched.email && <div>{errors.email}</div>}
      <Field name="password" type="password" placeholder="Password..." />
      {errors.password && touched.password && <div>{errors.password}</div>}
      <Field component="select" name="role">
        <option value="admin">Admin</option>
        <option value="authorized user">Authorized User</option>
        <option value="guest">Guest</option>
      </Field>
      <label>
        <Field
          type="checkbox"
          name="termsOfService"
          checked={values.termsOfService}
        />
        Accept Terms and Conditions
      </label>
      {errors.termsOfService && touched.termsOfService && (
        <div>{errors.termsOfService}</div>
      )}
      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
    </Form>
  </div>
);

export default SignUpForm;
