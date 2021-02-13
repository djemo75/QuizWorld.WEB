import { Button, CircularProgress, Typography } from "@material-ui/core";
import { Form, Formik } from "formik";
import moment from "moment";
import React, { useContext } from "react";

import {
  PUBLIC_TEST,
  TEST_STATUS_OPTIONS,
  TEST_VISIBILITY_OPTIONS,
  UNACTIVE_TEST,
} from "../../constants/tests";
import { AuthContext } from "../../context/AuthContext";
import { CustomDialog } from "../../shared/components/CustomDialog";
import { FormikField } from "../../shared/components/FormikField";
import FormikSelect from "../../shared/components/FormikSelect";
import { testSchema } from "../../validationSchemas/testSchema";

export const TestFormDialog = ({
  visible,
  handleClose,
  values,
  handleSubmit,
  editMode,
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
    createdAt: moment().utc(new Date()),
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
        {({ errors, touched, isSubmitting }) => {
          return (
            <>
              <Form className="create-test-form" noValidate>
                <Typography variant="h6">Information:</Typography>
                <FormikField
                  label="Name"
                  name="name"
                  error={touched.name && errors.name}
                  disabled={isSubmitting}
                  size="small"
                  fullWidth
                  required
                />
                <FormikField
                  label="Description"
                  name="description"
                  error={touched.description && errors.description}
                  disabled={isSubmitting}
                  size="small"
                  fullWidth
                  multiline
                />
                <Typography variant="h6">Settings:</Typography>
                {editMode && (
                  <FormikSelect
                    label="Status"
                    name="status"
                    items={TEST_STATUS_OPTIONS}
                    disabled={isSubmitting}
                    size="small"
                    error={touched.status && errors.status}
                    fullWidth
                  />
                )}
                <FormikSelect
                  label="Visibility"
                  name="visibility"
                  items={TEST_VISIBILITY_OPTIONS}
                  disabled={isSubmitting}
                  size="small"
                  error={touched.visibility && errors.visibility}
                  fullWidth
                />
                <FormikField
                  label="Duration (minutes)"
                  name="duration"
                  error={touched.duration && errors.duration}
                  disabled={isSubmitting}
                  size="small"
                  fullWidth
                />
                <div className="actions">
                  <Button
                    color="primary"
                    className="cancel-btn"
                    onClick={handleClose}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className="submit-btn"
                    disabled={isSubmitting || hasErrors(touched, errors)}
                    startIcon={isSubmitting && <CircularProgress size="20px" />}
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
