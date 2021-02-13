import * as Yup from "yup";

export const registerSchema = Yup.object().shape({
  username: Yup.string()
    .min(4, "Minimum field length is 4 characters")
    .required("This Field is Requried"),
  password: Yup.string()
    .min(4, "Minimum field length is 4 characters")
    .required("This Field is Requried"),
  confirmPassword: Yup.string()
    .min(4, "Minimum field length is 4 characters")
    .required("This Field is Requried")
    .oneOf([Yup.ref("password"), null], "Does not match the password!"),
});
