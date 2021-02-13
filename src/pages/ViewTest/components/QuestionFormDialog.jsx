import {
  Box,
  Button,
  CircularProgress,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import { AddCircleOutlined, DeleteForeverOutlined } from "@material-ui/icons";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

import {
  addOptionsBulk,
  deleteOptionsBulk,
  editOptionsBulk,
} from "../../../services/options";
import { addQuestion, editQuestionById } from "../../../services/questions";
import { CustomDialog } from "../../../shared/components/CustomDialog";
import { FormikField } from "../../../shared/components/FormikField";
import { ValidationError } from "../../../shared/components/ValidationError";
import {
  errorNotification,
  successNotification,
} from "../../../utils/notifications";
import { questionSchema } from "../../../validationSchemas/questionSchema";

export const QuestionFormDialog = ({
  visible,
  handleClose,
  editMode,
  fetchQuestions,
  values,
}) => {
  const params = useParams();
  const [idsForDelete, setIdsForDelete] = useState([]);

  const createQuestion = async (values) => {
    const questionPayload = {
      testId: params.id,
      question: values.question,
    };
    const { data } = await addQuestion(questionPayload);
    const questionId = data.questionId;

    const optionsPayload = {
      options: values.options.map((option) => ({ ...option, questionId })),
    };
    await addOptionsBulk(optionsPayload);
  };

  const updateQuestion = async (values) => {
    const { data } = await editQuestionById(values.id, {
      question: values.question,
    });

    const newQuestionId = Number(data.questionId);
    const newValues = values;
    // Used to detect if the question is used in some test
    if (newQuestionId !== values.id) {
      newValues.options = newValues.options.map((option) => ({
        ...option,
        id: null,
        questionId: data.questionId,
      }));
    }

    const optionsForAdd = newValues.options.filter((option) => !option.id);
    if (optionsForAdd.length) {
      await addOptionsBulk({
        options: optionsForAdd.map((option) => ({
          ...option,
          questionId:
            newQuestionId !== values.id ? newQuestionId : newValues.id,
        })),
      });
    }

    const optionsForEdit = newValues.options.filter((option) => option.id);
    if (optionsForEdit.length) {
      await editOptionsBulk({ options: optionsForEdit });
    }

    if (newQuestionId === values.id && idsForDelete.length) {
      await deleteOptionsBulk({ options: idsForDelete });
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true);

      if (editMode) {
        await updateQuestion(values);
      } else {
        await createQuestion(values);
      }

      setSubmitting(false);
      handleClose();
      await fetchQuestions();
      successNotification(
        editMode
          ? "Successfully updated question!"
          : "Successfully added question!",
      );
    } catch (error) {
      errorNotification(error);
      setSubmitting(false);
      handleClose();
    }
  };

  const hasErrors = (touched, errors) => {
    if (
      (touched.question && errors.question) ||
      (touched.options && errors.options)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const initialValues = {
    id: values?.id,
    question: values?.question ? values.question : "",
    options: values?.options ? values.options : [],
  };

  return (
    <>
      <CustomDialog
        title={editMode ? "Edit Question" : "Add Question"}
        visible={visible}
      >
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={questionSchema}
        >
          {({ errors, touched, values, setFieldValue, isSubmitting }) => {
            return (
              <>
                <Form className="question-form" noValidate>
                  <FormikField
                    label="Question"
                    name="question"
                    error={touched.question && errors.question}
                    disabled={isSubmitting}
                    size="small"
                    fullWidth
                    required
                  />

                  <RadioGroup
                    onChange={(e) => {
                      const updatedOptions = values.options.map(
                        (item, itemIndex) =>
                          itemIndex === Number(e.target.value)
                            ? { ...item, isRight: true }
                            : { ...item, isRight: false },
                      );
                      setFieldValue("options", updatedOptions);
                    }}
                    disabled={isSubmitting}
                  >
                    {values.options.map((option, index) => (
                      <div className="option" key={index}>
                        <FormControlLabel
                          value={String(index)}
                          control={<Radio style={{ color: "#29b6f6" }} />}
                          label={
                            <FormikField
                              label={`Option ${index + 1}`}
                              name={`options[${index}].option`}
                              customOnChange={(e) => {
                                setFieldValue(
                                  `options[${index}].option`,
                                  e.target.value,
                                );
                              }}
                              disabled={isSubmitting}
                              size="small"
                              fullWidth
                              required
                            />
                          }
                          checked={option.isRight}
                          disabled={isSubmitting}
                        />

                        <IconButton
                          onClick={() => {
                            const updatedOptions = values.options.filter(
                              (item, itemIndex) => itemIndex !== index,
                            );
                            setFieldValue("options", updatedOptions);
                            if (option.id) {
                              setIdsForDelete([...idsForDelete, option.id]);
                            }
                          }}
                          style={{ color: "#ff3d00" }}
                          disabled={isSubmitting}
                        >
                          <DeleteForeverOutlined />
                        </IconButton>
                      </div>
                    ))}
                  </RadioGroup>
                  {touched.options && (
                    <ValidationError error={errors.options} />
                  )}

                  <Box display="flex" justifyContent="center">
                    <IconButton
                      onClick={() => {
                        const updatedOptions = [
                          ...values.options,
                          {
                            option: "",
                            isRight: false,
                          },
                        ];
                        setFieldValue("options", updatedOptions);
                      }}
                      style={{ color: "#29b6f6" }}
                      disabled={isSubmitting}
                    >
                      <AddCircleOutlined />
                    </IconButton>
                  </Box>

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
                      startIcon={
                        isSubmitting && <CircularProgress size="20px" />
                      }
                    >
                      Save
                    </Button>
                  </div>
                </Form>
              </>
            );
          }}
        </Formik>
      </CustomDialog>
      <style jsx>{`
        .option {
          display: flex;
        }
        :global(.option .MuiFormControlLabel-label) {
          width: 100%;
        }
        :global(.option .MuiFormControlLabel-root) {
          width: 100%;
          margin-right: 5px;
        }
      `}</style>
    </>
  );
};
