import { Avatar, Box, Chip, LinearProgress, Paper } from "@material-ui/core";
import {
  CheckCircleOutlined,
  HighlightOffOutlined,
  RadioButtonUncheckedOutlined,
} from "@material-ui/icons";
import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import ResultProvider, { ResultContext } from "../../context/ResultContext";
import { BackButton } from "../../shared/components/BackButton";
import { LoadingScreen } from "../../shared/components/LoadingScreen";
import { Main } from "../../shared/components/Main";
import { SanitizeHtml } from "../../shared/components/SanitizeHtml";

export const ViewTestResult = (props) => {
  const { resultId, id: testId } = useParams();
  const { result, resultUserInfo, resultLoading, getResult } = useContext(
    ResultContext,
  );

  useEffect(() => {
    if (testId && resultId) {
      getResult(testId, resultId);
    }
  }, [testId, resultId]); // eslint-disable-line

  const getOptions = (options) => {
    return (
      <>
        {options.map((option) => {
          const icon =
            option.selected && option.isRight ? (
              <CheckCircleOutlined style={{ color: "green" }} />
            ) : option.isRight ? (
              <RadioButtonUncheckedOutlined style={{ color: "green" }} />
            ) : option.selected ? (
              <HighlightOffOutlined style={{ color: "red" }} />
            ) : (
              <RadioButtonUncheckedOutlined style={{ color: "lightgray" }} />
            );
          return (
            <Box key={option.id} pb={1} display="flex" alignItems="center">
              <Box minWidth="30px" display="flex" alignItems="center">
                {icon}
              </Box>
              <Box className="single-option">{option.option}</Box>
            </Box>
          );
        })}
      </>
    );
  };

  const totalQuestions = result && result.length;
  const totalCorrectAnswers =
    result &&
    result.filter((r) => r.options.some((o) => o.selected && o.isRight)).length;

  return (
    <Main title="Test Results">
      {resultLoading ? (
        <Box mb={3}>
          <LoadingScreen />
        </Box>
      ) : result && result.length ? (
        <>
          <Box
            component={Paper}
            display="flex"
            alignItems="center"
            bgcolor="primary.dark"
            color="primary.contrastText"
            padding="19.5px 30px"
            mb={4}
          >
            <BackButton />
            {resultUserInfo && (
              <Box
                component={Chip}
                avatar={<Avatar />}
                label={resultUserInfo.username}
                ml={2}
              />
            )}
            <Box width="150px" ml={2}>
              <Box textAlign="center" fontWeight="normal" fontSize="14px">
                {totalCorrectAnswers} / {totalQuestions}
              </Box>
              <Box>
                <LinearProgress
                  variant="determinate"
                  value={(totalCorrectAnswers / totalQuestions) * 100}
                />
              </Box>
            </Box>
          </Box>
          <Box mb={3}>
            {result.map((question, index) => (
              <Box key={index} component={Paper} className="questions-wrapper">
                <Box display="flex" alignItems="center">
                  <Box className="question-index">{index + 1}</Box>
                  <SanitizeHtml html={question.question} />
                </Box>
                {question.options && (
                  <Box ml={4.25} mt={2}>
                    {getOptions(question.options)}
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        </>
      ) : null}
      <style jsx global>{`
        .questions-wrapper {
          padding: 12px 20px;
          margin-bottom: 20px;
        }
        .questions-wrapper .question-index {
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
        .questions-wrapper .single-option {
          padding: 5px 10px;
          border-radius: 10px;
          background: #9e9e9e2e;
        }
      `}</style>
    </Main>
  );
};

const HOC = (props) => {
  return (
    <ResultProvider>
      <ViewTestResult {...props} />
    </ResultProvider>
  );
};

export default HOC;
