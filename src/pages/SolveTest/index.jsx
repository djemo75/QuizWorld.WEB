import { Button, Grid } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { ACTIVE_TEST } from "../../constants/tests";
import TestProvider, { TestContext } from "../../context/TestContext";
import { solveTestById } from "../../services/tests";
import { LoadingScreen } from "../../shared/components/LoadingScreen";
import { Main } from "../../shared/components/Main";
import { errorNotification } from "../../utils/notifications";
import { QuestionsList } from "../ViewTest/components/QuestionsList";
import { TestHeader } from "./components/TestHeader";
import { TestConfirmDialog } from "./dialogs/TestConfirmDialog";

const SolveTest = () => {
  const params = useParams();
  const [answers, setAnswers] = useState([]);
  const [confirmDialog, setConfirmDialog] = useState({
    visible: false,
    hasTime: true,
  });
  const [isSubmiting, setSubmiting] = useState(false);
  const [score, setScore] = useState(null);
  const {
    getTest,
    test,
    testloading,
    getQuestionsWithOptions,
    questions,
    questionsLoading,
    questionsError,
  } = useContext(TestContext);

  useEffect(() => {
    fetchTest();
  }, [params.id]); /* eslint-disable-line */

  const fetchTest = () => getTest(params.id);
  const fetchQuestions = () => getQuestionsWithOptions(params.id);

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
    } catch (error) {
      errorNotification(error);
    } finally {
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
      {testloading ? (
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

const HOC = (props) => {
  return (
    <TestProvider>
      <SolveTest {...props} />
    </TestProvider>
  );
};

export default HOC;
