import * as Yup from "yup";

const validateOptionsLength = (options) => {
  if (options && options.length >= 2) {
    return true;
  }
  return false;
};

const validateOptions = (options) => {
  if (options.some((option) => !option.option)) {
    return false;
  } else {
    return true;
  }
};

const validateCorrectOption = (options) => {
  if (options.every((option) => option.isRight === false)) {
    return false;
  } else {
    return true;
  }
};

export const questionSchema = Yup.object().shape({
  question: Yup.string()
    .min(4, "Minimum field length is 4 characters")
    .required("This Field is Requried"),
  options: Yup.array()
    .test("options", "Please insert minimum two options", validateOptionsLength)
    .test("options", "Please fill all options", validateOptions)
    .test("options", "Please select one correct option", validateCorrectOption),
});
