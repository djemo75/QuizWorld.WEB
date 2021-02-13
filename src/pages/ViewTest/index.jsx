import { Grid } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import { STATIC_ROUTES } from "../../routes";
import { getQuestionsWithOptionsWithAnswersByTestId } from "../../services/questions";
import { getTestById, getTestStatistic } from "../../services/tests";
import { LoadingScreen } from "../../shared/components/LoadingScreen";
import { Main } from "../../shared/components/Main";
import { errorNotification } from "../../utils/notifications";
import { QuestionsActionBar } from "./components/QuestionsActionBar";
import { QuestionsList } from "./components/QuestionsList";
import { TestHeader } from "./components/TestHeader";
import { TestInfo } from "./components/TestInfo";
import { TestStatisticsAndSettings } from "./components/TestStatisticsAndSettings";

const ViewTest = (props) => {
  const params = useParams();
  const history = useHistory();
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [questionsLoading, setQuestionsLoading] = useState(false);
  const [statistic, setStatistic] = useState(null);
  const [statisticLoading, setStatisticLoading] = useState(false);
  const { user, isAdmin } = useContext(AuthContext);

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
      fetchQuestions();
      fetchStatistic();
    }
  }, [user, test, isAdmin]); /* eslint-disable-line */

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
      setQuestionsLoading(true);
      const { data } = await getQuestionsWithOptionsWithAnswersByTestId(
        params.id,
      );
      setQuestions(data);
      setQuestionsLoading(false);
    } catch (error) {
      errorNotification(error);
      setQuestionsLoading(false);
    }
  };

  const fetchStatistic = async () => {
    try {
      setStatisticLoading(true);
      const { data } = await getTestStatistic(test.id);
      setStatistic(data);
      setStatisticLoading(false);
    } catch (error) {
      errorNotification(error);
      setStatisticLoading(false);
    }
  };

  return (
    <Main>
      {loading ? (
        <LoadingScreen />
      ) : (
        test && (
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <TestHeader test={test} />
            </Grid>
            <Grid item xs={6}>
              <TestInfo test={test} fetchData={fetchTest} />
            </Grid>
            <Grid item xs={6}>
              <TestStatisticsAndSettings
                test={test}
                statistic={statistic}
                loading={statisticLoading}
              />
            </Grid>

            {(isAdmin || user.id === test.user.id) && (
              <>
                <Grid
                  item
                  xs={12}
                  style={{ paddingTop: "0px", paddingBottom: "0px" }}
                >
                  <QuestionsActionBar
                    fetchQuestions={() => {
                      fetchQuestions();
                      fetchStatistic();
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <QuestionsList
                    data={questions}
                    fetchQuestions={() => {
                      fetchQuestions();
                      fetchStatistic();
                    }}
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

export default ViewTest;
