import { Box, Paper, TextField } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import { INITIAL_PAGE_SIZE } from "../../constants/table";
import ResultProvider, { ResultContext } from "../../context/ResultContext";
import TestProvider, { TestContext } from "../../context/TestContext";
import { STATIC_ROUTES } from "../../routes";
import { BackButton } from "../../shared/components/BackButton";
import { CustomTable } from "../../shared/components/CustomTable";
import { LoadingScreen } from "../../shared/components/LoadingScreen";
import { Main } from "../../shared/components/Main";
import { SearchButton } from "../../shared/components/SearchButton";
import { testResultsTableColumns } from "./constants";
import { DeleteSingleResultDialog } from "./dialogs/DeleteSingleResultDialog";
import { ViewResultDialog } from "./dialogs/ViewResultDialog";

const DEFAULT_VISIBLE_STATE = { view: false, delete: false };

const TestResults = (props) => {
  const params = useParams();
  const history = useHistory();
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(INITIAL_PAGE_SIZE);
  const [searchString, setSearchString] = useState("");
  const [visible, setVisible] = useState(DEFAULT_VISIBLE_STATE);
  const [currentResult, setCurrentResult] = useState(null);
  const { getTest, test, testLoading } = useContext(TestContext);
  const { results, resultsLoading, resultsTotal, getTestResults } = useContext(
    ResultContext,
  );

  useEffect(() => {
    fetchTest();
  }, [params.id]); /* eslint-disable-line */

  useEffect(() => {
    if (test) {
      fetchResults();
    }
  }, [test, pageNumber, pageSize]); /* eslint-disable-line */

  const fetchTest = () => getTest(params.id);

  const fetchResults = () => {
    const requestParams = { pageNumber, pageSize, searchString };
    getTestResults(params.id, requestParams);
  };

  const constructColumns = () => {
    const actions = {
      view: (data) => {
        history.push(
          STATIC_ROUTES.viewTestResult
            .replace(":id", params.id)
            .replace(":resultId", data.id),
        );
      },
      delete: (data) => {
        setVisible({ ...visible, delete: true });
        setCurrentResult(data);
      },
    };
    return testResultsTableColumns(actions);
  };

  return (
    <Main title="Test results">
      {testLoading ? (
        <LoadingScreen />
      ) : (
        test && (
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
              <div className="test-title">{test.name}</div>
            </Box>

            <Box display="flex" alignItems="center">
              <TextField
                placeholder="Search by username ..."
                name="searchString"
                value={searchString}
                onChange={(e) => setSearchString(e.target.value)}
                onKeyPress={({ charCode }) => charCode === 13 && fetchResults()}
                variant="outlined"
                size="small"
              />

              <SearchButton onClick={() => fetchResults()} />
            </Box>

            <CustomTable
              columns={constructColumns()}
              data={results}
              totalCount={resultsTotal}
              pageNumber={pageNumber}
              pageSize={pageSize}
              handleChangePage={(page) => setPageNumber(page)}
              handleChangePageSize={setPageSize}
              loading={resultsLoading}
            />

            <ViewResultDialog
              visible={visible.view}
              currentResult={currentResult}
              handleClose={() => setVisible(DEFAULT_VISIBLE_STATE)}
              testId={params.id}
            />
            <DeleteSingleResultDialog
              visible={visible.delete}
              currentResult={currentResult}
              handleClose={() => setVisible(DEFAULT_VISIBLE_STATE)}
              testId={params.id}
              fetchResults={fetchResults}
            />
          </>
        )
      )}
      <style jsx>{`
        .test-title {
          font-size: 22px;
          margin-right: 20px;
        }
      `}</style>
    </Main>
  );
};

const HOC = (props) => {
  return (
    <TestProvider>
      <ResultProvider>
        <TestResults {...props} />
      </ResultProvider>
    </TestProvider>
  );
};

export default HOC;
