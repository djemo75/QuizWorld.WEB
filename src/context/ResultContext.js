import React, { createContext, useState } from "react";

import {
  getMyResults,
  getTestResultByResultId,
  getTestResultsById,
} from "../services/tests";
import { errorNotification } from "../utils/notifications";

export const ResultContext = createContext();

const DEFAULT_STATE = {
  results: [],
  resultsTotal: null,
  resultsLoading: false,
  //
  result: null,
  resultUserInfo: null,
  resultLoading: false,
};

const ResultProvider = ({ children }) => {
  const [state, setState] = useState(DEFAULT_STATE);

  const handleUpdate = (which, value) => {
    setState((state) => ({ ...state, [which]: value }));
  };

  const getAllMyResults = async (params) => {
    try {
      handleUpdate("resultsLoading", true);
      const { data } = await getMyResults(params);
      setState((s) => ({
        ...s,
        results: data.results,
        resultsTotal: data.totalCount,
        resultsLoading: false,
      }));
    } catch (error) {
      handleUpdate("resultsLoading", false);
      errorNotification(error);
    }
  };

  const getTestResults = async (testId, params) => {
    try {
      handleUpdate("resultsLoading", true);
      const { data } = await getTestResultsById(testId, params);
      setState((s) => ({
        ...s,
        results: data.results,
        resultsTotal: data.totalCount,
        resultsLoading: false,
      }));
    } catch (error) {
      handleUpdate("resultsLoading", false);
      errorNotification(error);
    }
  };

  const getResult = async (testId, resultId) => {
    try {
      handleUpdate("resultLoading", true);
      const { data } = await getTestResultByResultId(testId, resultId);
      setState((s) => ({
        ...s,
        result: data.result,
        resultUserInfo: data.user,
        resultLoading: false,
      }));
    } catch (error) {
      handleUpdate("resultLoading", false);
      errorNotification(error);
    }
  };

  return (
    <ResultContext.Provider
      value={{
        ...state,
        getAllMyResults,
        getTestResults,
        getResult,
      }}
    >
      {children}
    </ResultContext.Provider>
  );
};

export default ResultProvider;
