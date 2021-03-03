import { Button, CircularProgress, Typography } from "@material-ui/core";
import { Form, Formik } from "formik";
import React, { useContext } from "react";

import {
  PUBLIC_TEST,
  TEST_STATUS_OPTIONS,
  TEST_VISIBILITY_OPTIONS,
  UNACTIVE_TEST,
} from "../../../constants/tests";
import { AuthContext } from "../../../context/AuthContext";
import { CustomDialog } from "../../../shared/components/CustomDialog";
import { FormikField } from "../../../shared/components/FormikField";
import FormikSelect from "../../../shared/components/FormikSelect";
import { TextEditor } from "../../../shared/components/TextEditor";
import { testSchema } from "../../../validationSchemas/testSchema";

export const TestFormDialog = ({
  visible,
  handleClose,
  values,
  handleSubmit,
  editMode,
  loading,
}) => {
  const { user } = useContext(AuthContext);

  const hasErrors = (touched, errors) => {
    if (
      (touched.name && errors.name) ||
      (touched.description && errors.description) ||
      (touched.duration && errors.duration) ||
      (touched.visibility && errors.visibility)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const initialValues = {
    userId: values?.userId ? values.userId : user.id,
    name: values?.name ? values.name : "",
    description: values?.description ? values.description : "",
    duration: values?.duration ? values.duration : "",
    visibility: values?.visibility ? values.visibility : PUBLIC_TEST,
    status: values?.status ? values.status : UNACTIVE_TEST,
  };

  return (
    <CustomDialog
      title={editMode ? "Edit Test" : "Create Test"}
      visible={visible}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={testSchema}
      >
        {({ errors, touched, values, setFieldValue }) => {
          return (
            <>
              <Form className="create-test-form" noValidate>
                <Typography variant="h6">Information:</Typography>
                <FormikField
                  label="Name"
                  name="name"
                  error={touched.name && errors.name}
                  disabled={loading}
                  size="small"
                  fullWidth
                  required
                />
                <TextEditor
                  value={values.description}
                  onChange={(value) => setFieldValue("description", value)}
                  placeholder="Description"
                  disabled={loading}
                />
                <Typography variant="h6">Settings:</Typography>
                {editMode && (
                  <FormikSelect
                    label="Status"
                    name="status"
                    items={TEST_STATUS_OPTIONS}
                    disabled={loading}
                    size="small"
                    error={touched.status && errors.status}
                    fullWidth
                  />
                )}
                <FormikSelect
                  label="Visibility"
                  name="visibility"
                  items={TEST_VISIBILITY_OPTIONS}
                  disabled={loading}
                  size="small"
                  error={touched.visibility && errors.visibility}
                  fullWidth
                />
                <FormikField
                  label="Duration (minutes)"
                  name="duration"
                  error={touched.duration && errors.duration}
                  disabled={loading}
                  size="small"
                  fullWidth
                />
                <div className="actions">
                  <Button
                    color="primary"
                    className="cancel-btn"
                    onClick={handleClose}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className="submit-btn"
                    disabled={loading || hasErrors(touched, errors)}
                    startIcon={loading && <CircularProgress size="20px" />}
                  >
                    {editMode ? "Edit" : "Create"}
                  </Button>
                </div>
              </Form>
            </>
          );
        }}
      </Formik>
    </CustomDialog>
  );
};
