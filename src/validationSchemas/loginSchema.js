import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required")
    .min(4, "Minimum field length is 4 characters"),
  password: Yup.string()
    .required("Password is required")
    .min(4, "Minimum field length is 4 characters"),
});
