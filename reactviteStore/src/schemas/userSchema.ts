import * as Yup from "yup";

export const UserValidation = Yup.object().shape({
  firstname: Yup.string().max(50).required("First Name is required"),
  lastname: Yup.string().max(50).required("Last Name is required"),
  email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .test("Password cannot start or end with spaces", (value) => value === value.trim())
    .max(10, "Password must be less than 10 characters"),
});
