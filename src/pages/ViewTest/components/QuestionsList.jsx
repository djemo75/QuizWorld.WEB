import {
  Box,
  FormControlLabel,
  IconButton,
  Paper,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import { DeleteForeverOutlined, EditOutlined } from "@material-ui/icons";
import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";

import { LoadingScreen } from "../../../shared/components/LoadingScreen";
import { DeleteQuestionDialog } from "../dialogs/DeleteQuestionDialog";
import { QuestionFormDialog } from "./QuestionFormDialog";

const DEFAULT_VISIBLE_STATE = { delete: false, edit: false };

export const QuestionsList = ({
  loading,
  data,
  fetchQuestions,
  showActions = true,
  disabled,
  onChange,
}) => {
  const [questions, setQuestions] = useState([]);
  const [visible, setVisible] = useState(DEFAULT_VISIBLE_STATE);
  const [currentQuestion, setCurrentQuestion] = useState(null);

  useEffect(() => {
    setQuestions(data);
  }, [data]); // eslint-disable-line

  useEffect(() => {
    if (onChange) {
      onChange(questions);
    }
  }, [questions]); // eslint-disable-line

  const getActions = (question) => {
    return (
      <div style={{ display: "flex", marginLeft: "auto" }}>
        <IconButton
          onClick={() => {
            setCurrentQuestion(question);
            setVisible({ delete: false, edit: true });
          }}
          style={{ color: "#000" }}
        >
          <EditOutlined />
        </IconButton>
        <IconButton
          onClick={() => {
            setCurrentQuestion(question);
            setVisible({ delete: true, edit: false });
          }}
          style={{ color: "#ff3d00" }}
        >
          <DeleteForeverOutlined />
        </IconButton>
      </div>
    );
  };

  const getOptions = (question) => {
    return (
      <RadioGroup
        name={`question${question.id}`}
        value={String(question.options.filter((x) => x.isRight)?.id)}
        onChange={(e) => handleChangeAnswer(e, question.id)}
      >
        {question.options.map((option) => (
          <div key={option.id}>
            <FormControlLabel
              value={String(option.id)}
              control={<Radio color="primary" />}
              label={option.option}
              checked={option.isRight}
              disabled={disabled}
            />
          </div>
        ))}
      </RadioGroup>
    );
  };

  const handleChangeAnswer = (e, questionId) => {
    const optionId = e.target.value;
    const updatedQuestions = questions.map((question) => {
      if (question.id === questionId) {
        return {
          ...question,
          options: question.options.map((option) => {
            if (option.id === Number(optionId)) {
              return {
                ...option,
                isRight: true,
              };
            } else {
              return {
                ...option,
                isRight: false,
              };
            }
          }),
        };
      } else {
        return question;
      }
    });

    setQuestions(updatedQuestions);
  };

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          {!isEmpty(questions) &&
            questions.map((question, index) => (
              <Paper className="questions-wrapper" key={index + 1}>
                <Box display="flex" alignItems="center">
                  <span className="question-index">{index + 1}</span>{" "}
                  {question.question}
                  {showActions && getActions(question)}
                </Box>
                {!isEmpty(question.options) && (
                  <Box style={{ marginLeft: "5px", marginTop: "10px" }}>
                    {getOptions(question)}
                  </Box>
                )}
              </Paper>
            ))}
        </>
      )}

      <QuestionFormDialog
        visible={visible.edit}
        handleClose={() => setVisible(DEFAULT_VISIBLE_STATE)}
        fetchQuestions={fetchQuestions}
        values={currentQuestion}
        editMode
      />
      <DeleteQuestionDialog
        visible={visible.delete}
        handleClose={() => setVisible(DEFAULT_VISIBLE_STATE)}
        question={currentQuestion}
        fetchQuestions={fetchQuestions}
      />
      <style jsx>{`
        :global(.questions-wrapper) {
          padding: 12px 20px;
          margin-bottom: 20px;
        }
        .question-index {
          background: rgb(5, 83, 165);
          color: #fff;
          font-weight: bold;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 30px;
          height: 30px;
          border-radius: 4px;
          margin-right: 10px;
        }
      `}</style>
    </>
  );
};
