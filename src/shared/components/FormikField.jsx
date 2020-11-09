import { TextField } from "@material-ui/core";
import { Field } from "formik";
import React from "react";

import { ValidationError } from "./ValidationError";

const Input = (props) => {
  return (
    <div className="formik-field">
      <TextField
        label={props.label}
        fullWidth={props.fullWidth}
        autoComplete={props.autoComplete}
        autoFocus={props.autoFocus}
        name={props.name}
        id={props.id}
        type={props.type}
        required={props.required}
        disabled={props.disabled}
        variant={props.variant ? props.variant : "outlined"}
        size={props.size}
        rows={props.rows}
        multiline={props.multiline}
        onChange={props.customOnChange ? props.customOnChange : props.onChange}
        onBlur={props.onBlur}
        value={props.value}
        className={props.className}
        classes={props.classes}
        margin={props.margin ? props.margin : "normal"}
      />
      <ValidationError error={props.error} />
    </div>
  );
};

export const FormikField = (props) => {
  return (
    <>
      <Field
        as={Input}
        label={props.label}
        fullWidth={props.fullWidth ? props.fullWidth : false}
        autoComplete={props.autoComplete ? "on" : "off"}
        autoFocus={props.autoFocus}
        name={props.name}
        id={props.id}
        type={props.type}
        required={props.required}
        className={props.className}
        disabled={props.disabled}
        variant={props.variant}
        rows={props.rows ? props.rows : "5"}
        multiline={props.multiline}
        size={props.size}
        error={props.error}
        customOnChange={props.customOnChange}
        classes={props.classes}
      />
    </>
  );
};
