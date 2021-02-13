import * as Yup from "yup";

export const testSchema = Yup.object().shape({
  name: Yup.string()
    .max(150, "Maximum field length is 150 characters")
    .required("This Field is Requried"),
  status: Yup.string().required("This Field is Requried"),
  visibility: Yup.string().required("This Field is Requried"),
});
