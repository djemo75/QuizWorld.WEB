import React, { createContext, useState } from "react";
import { useHistory } from "react-router-dom";

import { STATIC_ROUTES } from "../routes";
import {
  getQuestionsWithOptionsByTestId,
  getQuestionsWithOptionsWithAnswersByTestId,
} from "../services/questions";
import {
  createTest,
  deleteTestById,
  editTestById,
  getAllTests,
  getTestById,
  getTestStatistic,
} from "../services/tests";
import { errorNotification, successNotification } from "../utils/notifications";

export const TestContext = createContext();

const DEFAULT_STATE = {
  tests: [],
  testsTotal: null,
  testsLoading: false,
  //
  test: null,
  testLoading: false,
  //
  createTestLoading: false,
  editTestLoading: false,
  deleteTestLoading: false,
  //
  questions: [],
  questionsLoading: false,
  questionsError: false,
  //
  statistic: null,
  statisticLoading: false,
};

const TestProvider = ({ children }) => {
  const [state, setState] = useState(DEFAULT_STATE);
  const history = useHistory();

  const handleUpdate = (which, value) => {
    setState((state) => ({ ...state, [which]: value }));
  };

  const getTests = async (params) => {
    try {
      handleUpdate("testsLoading", true);
      const { data } = await getAllTests(params);
      setState((s) => ({
        ...s,
        tests: data.tests,
        testsTotal: data.totalCount,
        testsLoading: false,
      }));
    } catch (error) {
      handleUpdate("testsLoading", false);
      errorNotification(error);
    }
  };

  const getTest = async (testId) => {
    try {
      handleUpdate("testLoading", true);
      const { data } = await getTestById(testId);
      setState((s) => ({
        ...s,
        test: data,
        testLoading: false,
      }));
    } catch (error) {
      handleUpdate("testLoading", false);
      errorNotification(error);
    }
  };

  const getStatistic = async (testId) => {
    try {
      handleUpdate("statisticLoading", true);
      const { data } = await getTestStatistic(testId);
      setState((s) => ({
        ...s,
        statistic: data,
        statisticLoading: false,
      }));
    } catch (error) {
      handleUpdate("statisticLoading", false);
      errorNotification(error);
    }
  };

  const createTestAction = async (values, successCallback) => {
    try {
      handleUpdate("createTestLoading", true);
      await createTest(values);
      successNotification("Successfully created!");
      if (successCallback) successCallback();
    } catch (error) {
      errorNotification(error);
    } finally {
      handleUpdate("createTestLoading", false);
    }
  };

  const editTest = async (testId, values, successCallback) => {
    try {
      handleUpdate("editTestLoading", true);
      await editTestById(testId, values);
      successNotification("Successfully edited!");
      if (successCallback) successCallback();
      getTest(testId);
    } catch (error) {
      errorNotification(error);
    } finally {
      handleUpdate("editTestLoading", false);
    }
  };

  const deleteTest = async (testId) => {
    try {
      handleUpdate("deleteTestLoading", true);
      await deleteTestById(testId);
      successNotification("Deleted successfully!");
      handleUpdate("deleteTestLoading", false);
      history.push(STATIC_ROUTES.tests);
    } catch (error) {
      errorNotification(error);
      handleUpdate("deleteTestLoading", false);
    }
  };

  const getQuestionsWithOptions = async (testId) => {
    try {
      setState((s) => ({
        ...s,
        questionsError: false,
        questionsLoading: true,
      }));
      const { data } = await getQuestionsWithOptionsByTestId(testId);
      setState((s) => ({
        ...s,
        questions: data,
        questionsLoading: false,
      }));
    } catch (error) {
      setState((s) => ({
        ...s,
        questionsError: true,
        questionsLoading: false,
      }));
      errorNotification(error);
    }
  };

  const getQuestionsWithOptionsWithAnswers = async (testId) => {
    try {
      setState((s) => ({
        ...s,
        questionsError: false,
        questionsLoading: true,
      }));
      const { data } = await getQuestionsWithOptionsWithAnswersByTestId(testId);
      setState((s) => ({
        ...s,
        questions: data,
        questionsLoading: false,
      }));
    } catch (error) {
      setState((s) => ({
        ...s,
        questionsError: true,
        questionsLoading: false,
      }));
      errorNotification(error);
    }
  };

  return (
    <TestContext.Provider
      value={{
        ...state,
        getTests,
        getTest,
        createTest: createTestAction,
        editTest,
        deleteTest,
        getQuestionsWithOptions,
        getQuestionsWithOptionsWithAnswers,
        getStatistic,
      }}
    >
      {children}
    </TestContext.Provider>
  );
};

export default TestProvider;
