import { Button, Grid } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { ACTIVE_TEST } from "../../constants/tests";
import { getQuestionsWithOptionsByTestId } from "../../services/questions";
import { solveTestById } from "../../services/tests";
import { getTestById } from "../../services/tests";
import { LoadingScreen } from "../../shared/components/LoadingScreen";
import { Main } from "../../shared/components/Main";
import { errorNotification } from "../../utils/notifications";
import { QuestionsList } from "../ViewTest/components/QuestionsList";
import { TestConfirmDialog } from "./components/TestConfirmDialog";
import { TestHeader } from "./components/TestHeader";

const SolveTest = () => {
  const params = useParams();
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [questionsLoading, setQuestionsLoading] = useState(false);
  const [questionsError, setQuestionsError] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [confirmDialog, setConfirmDialog] = useState({
    visible: false,
    hasTime: true,
  });
  const [isSubmiting, setSubmiting] = useState(false);
  const [score, setScore] = useState(null);

  useEffect(() => {
    fetchTest();
  }, [params.id]); /* eslint-disable-line */

  const fetchTest = async () => {
    try {
      setLoading(true);
      const { data } = await getTestById(params.id);
      setTest(data);
      setLoading(false);
    } catch (error) {
      errorNotification(error);
      setLoading(false);
    }
  };

  const fetchQuestions = async () => {
    try {
      setQuestionsError(false);
      setQuestionsLoading(true);
      const { data } = await getQuestionsWithOptionsByTestId(params.id);
      setQuestions(data);
      setQuestionsLoading(false);
    } catch (error) {
      setQuestionsError(true);
      errorNotification(error);
      setQuestionsLoading(false);
    }
  };

  const sendTestForSolving = async () => {
    const payload = answers.map((question) => {
      const selectedOption = question.options.find(({ isRight }) => isRight);

      return {
        id: question.id,
        selectedOptionId: selectedOption?.id,
      };
    });

    try {
      setSubmiting(true);
      const { data } = await solveTestById(params.id, { data: payload });
      setScore(data);
      setSubmiting(false);
    } catch (error) {
      errorNotification(error);
      setSubmiting(false);
    }
  };

  const isTestStarted =
    test &&
    test.status === ACTIVE_TEST &&
    !questionsLoading &&
    !questionsError &&
    questions.length;

  return (
    <Main>
      {loading ? (
        <LoadingScreen />
      ) : (
        test && (
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <TestHeader
                test={test}
                setConfirmDialog={setConfirmDialog}
                fetchQuestions={fetchQuestions}
                shoudShowTimer={isTestStarted}
                score={score}
              />
            </Grid>
            <Grid item xs={12}>
              <QuestionsList
                data={questions}
                loading={questionsLoading}
                onChange={setAnswers}
                showActions={false}
              />
            </Grid>
            <TestConfirmDialog
              {...confirmDialog}
              handleClose={() =>
                setConfirmDialog({ ...confirmDialog, visible: false })
              }
              sendTestForSolving={sendTestForSolving}
              isSubmiting={isSubmiting}
              score={score}
            />

            {isTestStarted ? (
              <Grid
                container
                item
                xs={12}
                justify="center"
                style={{ padding: "0px" }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    setConfirmDialog({ ...confirmDialog, visible: true })
                  }
                >
                  Send
                </Button>
              </Grid>
            ) : null}
          </Grid>
        )
      )}
    </Main>
  );
};

export default SolveTest;
