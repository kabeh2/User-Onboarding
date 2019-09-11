import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./forms.scss";

const SignUpForm = ({ errors, touched, values, isSubmitting, status }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      if (status) {
        setUsers([...users, status]);
        console.log("Users: " + JSON.stringify(users));
      }
    }

    return () => {
      mounted = false;
    };
  }, [status]);

  return (
    <>
      <h1>Signup</h1>

      <Form users={users} className="form-container">
        <Field name="name" type="text" placeholder="Name..." />
        {errors.name && touched.name && (
          <div className="errors">{errors.name}</div>
        )}
        <Field name="email" type="email" placeholder="Email..." />
        {errors.email && touched.email && (
          <div className="errors">{errors.email}</div>
        )}
        <Field name="password" type="password" placeholder="Password..." />
        {errors.password && touched.password && (
          <div className="errors">{errors.password}</div>
        )}
        <Field component="select" name="role">
          <option value="admin">Admin</option>
          <option value="authorized user">Authorized User</option>
          <option value="guest">Guest</option>
        </Field>
        <label className="tos">
          <Field
            type="checkbox"
            name="termsOfService"
            checked={values.termsOfService}
          />
          Accept Terms and Conditions
        </label>
        {errors.termsOfService && touched.termsOfService && (
          <div className="errors">{errors.termsOfService}</div>
        )}
        <button type="submit" disabled={isSubmitting}>
          Submit
        </button>
      </Form>

      <div className="user-list-container">
        <h1>Regitered Users</h1>
        <ul>
          {users.map(user => (
            <li key={user.id}>{user.email}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

const FormikSignUp = withFormik({
  mapPropsToValues({ name, email, password, role, termsOfService }) {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      role: role || "admin",
      termsOfService: termsOfService || false
    };
  },
  validationSchema: Yup.object().shape({
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
      .required("No password provided."),
    termsOfService: Yup.bool().oneOf(
      [true],
      "Terms of Service Must Be Accepted to Join"
    )
  }),
  handleSubmit(
    values,
    { setErrors, resetForm, setSubmitting, setStatus, users }
  ) {
    console.log("asdfasd: " + users);
    if (values.email === "waffle@syrup.com") {
      setErrors({ email: "That email is already taken." });
    } else {
      axios
        .post("https://reqres.in/api/users", values)
        .then(response => {
          console.log("Response: ", response.data);

          setStatus(response.data);
        })
        .catch(error => console.error("Error: ", error.message));
      resetForm();
    }
    setSubmitting(false);
  }
})(SignUpForm);

export default FormikSignUp;
