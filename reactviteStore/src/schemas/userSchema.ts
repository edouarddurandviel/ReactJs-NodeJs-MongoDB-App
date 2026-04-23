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

export const schemaRHF = Yup.object({
  firstName: Yup.string().required(),
  iceCreamType: Yup.object({
    label: Yup.string().required(),
    value: Yup.string().required(),
  }),
}).required();

export const schemaUser = Yup.object({
  firstName: Yup.string().required("Firstname is required"),
  email: Yup.string().email("Value must be an email").required("Email is required"),
}).required();
