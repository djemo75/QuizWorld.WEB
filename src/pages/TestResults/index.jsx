import { Box, IconButton, Paper, TextField } from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import { INITIAL_PAGE_SIZE } from "../../constants/table";
import { STATIC_ROUTES } from "../../routes";
import { getTestById, getTestResultsById } from "../../services/tests";
import { CustomTable } from "../../shared/components/CustomTable";
import { LoadingScreen } from "../../shared/components/LoadingScreen";
import { Main } from "../../shared/components/Main";
import { SearchButton } from "../../shared/components/SearchButton";
import { errorNotification } from "../../utils/notifications";
import { testResultsTableColumns } from "./constants";
import { DeleteSingleResultDialog } from "./dialogs/DeleteSingleResultDialog";
import { ViewResultDialog } from "./dialogs/ViewResultDialog";

const DEFAULT_VISIBLE_STATE = { view: false, delete: false };

const TestResults = (props) => {
  const params = useParams();
  const history = useHistory();
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [resultsLoading, setResultsLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(INITIAL_PAGE_SIZE);
  const [searchString, setSearchString] = useState("");
  const [visible, setVisible] = useState(DEFAULT_VISIBLE_STATE);
  const [currentResult, setCurrentResult] = useState(null);

  useEffect(() => {
    fetchTest();
  }, [params.id]); /* eslint-disable-line */

  useEffect(() => {
    if (test) {
      fetchResults();
    }
  }, [test, pageNumber, pageSize]); /* eslint-disable-line */

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

  const fetchResults = async () => {
    const requestParams = { pageNumber, pageSize, searchString };

    try {
      setResultsLoading(true);
      const { data } = await getTestResultsById(params.id, requestParams);
      setResults(data.results);
      setTotalCount(data.totalCount);
      setResultsLoading(false);
    } catch (error) {
      errorNotification(error);
      setResultsLoading(false);
    }
  };

  const constructColumns = () => {
    const actions = {
      view: (data) => {
        setVisible({ ...visible, view: true });
        setCurrentResult(data);
      },
      delete: (data) => {
        setVisible({ ...visible, delete: true });
        setCurrentResult(data);
      },
    };
    return testResultsTableColumns(actions);
  };

  const handleBack = () => {
    history.push(STATIC_ROUTES.viewTest.replace(":id", params.id));
  };

  return (
    <Main title="Test results">
      {loading ? (
        <LoadingScreen />
      ) : (
        test && (
          <>
            <Box
              component={Paper}
              display="flex"
              justifyContent="space-between"
              bgcolor="primary.dark"
              color="primary.contrastText"
              padding="19.5px 30px"
              mb={4}
            >
              <Box display="flex" alignItems="center">
                <IconButton
                  className="back-button"
                  size="small"
                  onClick={handleBack}
                >
                  <KeyboardBackspaceIcon />
                </IconButton>
                <div className="test-title">{test.name}</div>
              </Box>
            </Box>

            <Box display="flex" alignItems="center">
              <TextField
                placeholder="Search by username ..."
                name="searchString"
                value={searchString}
                onChange={(e) => setSearchString(e.target.value)}
                variant="outlined"
                size="small"
              />

              <SearchButton onClick={() => fetchResults()} />
            </Box>
            <CustomTable
              columns={constructColumns()}
              data={results}
              totalCount={totalCount}
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
        :global(.back-button) {
          border: 1px solid #fff;
          background: rgba(255, 255, 255, 0.1);
          margin-right: 15px;
        }
        :global(.back-button:hover) {
          background: #e6e6e6;
        }
        :global(.back-button svg) {
          color: #fff;
        }
        :global(.back-button svg:hover) {
          color: #2196f3;
        }
      `}</style>
    </Main>
  );
};

export default TestResults;
