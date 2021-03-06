import { Grid } from "@material-ui/core";
import React, { useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import TestProvider, { TestContext } from "../../context/TestContext";
import { STATIC_ROUTES } from "../../routes";
import { LoadingScreen } from "../../shared/components/LoadingScreen";
import { Main } from "../../shared/components/Main";
import { QuestionsActionBar } from "./components/QuestionsActionBar";
import { QuestionsList } from "./components/QuestionsList";
import { TestHeader } from "./components/TestHeader";
import { TestInfo } from "./components/TestInfo";
import { TestStatisticsAndSettings } from "./components/TestStatisticsAndSettings";

const ViewTest = (props) => {
  const params = useParams();
  const history = useHistory();
  const { user, isAdmin } = useContext(AuthContext);
  const {
    getTest,
    test,
    testLoading,
    getQuestionsWithOptionsWithAnswers,
    questions,
    questionsLoading,
    getStatistic,
  } = useContext(TestContext);

  useEffect(() => {
    fetchTest();
  }, [params.id]); /* eslint-disable-line */

  // User that is not admin or not test owner - redirect to solve page
  useEffect(() => {
    if (test && !isAdmin && user.id !== test.user.id) {
      history.push(STATIC_ROUTES.solveTest.replace(":id", params.id));
    }
  }, [user, test, isAdmin]); /* eslint-disable-line */

  useEffect(() => {
    if (test && (isAdmin || user.id === test.user.id)) {
      fetchTestRelatedInfo();
    }
  }, [user, test, isAdmin]); /* eslint-disable-line */

  const fetchTest = () => getTest(params.id);
  const fetchQuestions = () => getQuestionsWithOptionsWithAnswers(params.id);
  const fetchStatistic = () => getStatistic(params.id);

  const fetchTestRelatedInfo = () => {
    fetchQuestions();
    fetchStatistic();
  };

  return (
    <Main>
      {testLoading ? (
        <LoadingScreen />
      ) : (
        test && (
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <TestHeader test={test} />
            </Grid>

            <Grid item xs={12} md={6}>
              <TestInfo test={test} fetchData={fetchTest} />
            </Grid>

            <Grid item xs={12} md={6}>
              <TestStatisticsAndSettings test={test} />
            </Grid>

            {(isAdmin || user.id === test.user.id) && (
              <>
                <Grid
                  item
                  xs={12}
                  style={{ paddingTop: "0px", paddingBottom: "0px" }}
                >
                  <QuestionsActionBar fetchQuestions={fetchTestRelatedInfo} />
                </Grid>

                <Grid item xs={12}>
                  <QuestionsList
                    data={questions}
                    fetchQuestions={fetchTestRelatedInfo}
                    loading={questionsLoading}
                    disabled
                  />
                </Grid>
              </>
            )}
          </Grid>
        )
      )}
    </Main>
  );
};

const HOC = (props) => {
  return (
    <TestProvider>
      <ViewTest {...props} />
    </TestProvider>
  );
};

export default HOC;
