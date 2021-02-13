import { Box, IconButton, Paper } from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import { INITIAL_PAGE_SIZE } from "../../constants/table";
import { STATIC_ROUTES } from "../../routes";
import { getTestById, getTestParticipantsById } from "../../services/tests";
import { CustomTable } from "../../shared/components/CustomTable";
import { LoadingScreen } from "../../shared/components/LoadingScreen";
import { Main } from "../../shared/components/Main";
import { errorNotification } from "../../utils/notifications";
import { ActionBar } from "./components/ActionBar";
import { testParticipantsTableColumns } from "./constants";
import { RemoveParticipantDialog } from "./dialogs/RemoveParticipantDialog";

const DEFAULT_SORTING_VALUES = {
  sortBy: "createdAt",
  sortDirection: "desc",
};

const TestParticipants = (props) => {
  const params = useParams();
  const history = useHistory();
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [participantsLoading, setParticipantsLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [sortingValues, setSortingValues] = useState(DEFAULT_SORTING_VALUES);
  const [searchString, setSearchString] = useState("");
  const [pageSize, setPageSize] = useState(INITIAL_PAGE_SIZE);
  const [visible, setVisible] = useState(false);
  const [currentParticipant, setCurrentParticipant] = useState(null);

  useEffect(() => {
    fetchTest();
  }, [params.id]); /* eslint-disable-line */

  useEffect(() => {
    if (test) {
      fetchParticipants();
    }
  }, [test, pageNumber, pageSize, sortingValues]); /* eslint-disable-line */

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

  const fetchParticipants = async () => {
    const requestParams = {
      pageNumber,
      pageSize,
      searchString,
      ...sortingValues,
    };

    try {
      setParticipantsLoading(true);
      const { data } = await getTestParticipantsById(params.id, requestParams);
      setParticipants(data.participants);
      setTotalCount(data.totalCount);
      setParticipantsLoading(false);
    } catch (error) {
      errorNotification(error);
      setParticipantsLoading(false);
    }
  };

  const constructColumns = () => {
    const actions = {
      remove: (data) => {
        setVisible(true);
        setCurrentParticipant(data);
      },
    };
    return testParticipantsTableColumns(actions);
  };

  const handleBack = () => {
    history.push(STATIC_ROUTES.viewTest.replace(":id", params.id));
  };

  return (
    <Main title="Participants">
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

            <ActionBar
              fetchParticipants={fetchParticipants}
              searchString={searchString}
              setSearchString={setSearchString}
            />

            <CustomTable
              columns={constructColumns()}
              data={participants}
              totalCount={totalCount}
              pageNumber={pageNumber}
              pageSize={pageSize}
              handleChangePage={(page) => setPageNumber(page)}
              handleChangePageSize={setPageSize}
              sortingValues={sortingValues}
              setSortingValues={setSortingValues}
              loading={participantsLoading}
            />

            <RemoveParticipantDialog
              visible={visible}
              currentParticipant={currentParticipant}
              handleClose={() => setVisible(false)}
              fetchParticipants={fetchParticipants}
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

export default TestParticipants;
