import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { ErrorMessage, Field } from "formik";
import React from "react";

import { ValidationError } from "./ValidationError";

const MaterialUISelectField = (props) => {
  const defaultValue = "loading";
  return (
    <>
      <FormControl
        fullWidth={props.fullWidth ? props.fullWidth : false}
        disabled={props.disabled}
        size={props.size}
        variant={props.variant}
        error={props.error}
      >
        <InputLabel required={props.required} variant={props.variant}>
          {props.label}
        </InputLabel>
        <Select
          name={props.name}
          onChange={
            props.customOnChange ? props.customOnChange : props.onChange
          }
          onBlur={props.onBlur}
          value={props.children.length ? props.value : defaultValue}
          variant={props.variant}
          native={props.native}
        >
          {props.children.length ? (
            props.children
          ) : (
            <option value={defaultValue}>Loading...</option>
          )}
        </Select>
        <ValidationError error={props.errorString} />
      </FormControl>
      <style jsx>{`
        :global(.formik-select label) {
          background: #fff;
          padding: 0px 5px;
          margin-left: -5px;
        }
      `}</style>
    </>
  );
};

const FormikSelect = (props) => {
  return (
    <div className="formik-select">
      <Field
        as={MaterialUISelectField}
        name={props.name}
        label={props.label}
        fullWidth={props.fullWidth}
        required={props.required}
        errorString={<ErrorMessage name={props.name} />}
        disabled={props.disabled}
        variant={props.variant ? props.variant : "outlined"}
        error={props.error}
        customOnChange={props.customOnChange}
        size={props.size}
        native={props.native}
      >
        {!props.native
          ? props.items.map((menuItem, index) => (
              <MenuItem
                key={`${menuItem.value}-${index}`}
                value={menuItem.value}
                dense={props.denseMenuItem}
              >
                {menuItem.label}
              </MenuItem>
            ))
          : props.items.map((menuItem, index) => (
              <option key={`${menuItem.value}-${index}`} value={menuItem.value}>
                {menuItem.label}
              </option>
            ))}
      </Field>
    </div>
  );
};

export default FormikSelect;
