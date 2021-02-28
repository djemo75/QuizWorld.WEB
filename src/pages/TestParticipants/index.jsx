import { Box, Paper } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { INITIAL_PAGE_SIZE } from "../../constants/table";
import TestProvider, { TestContext } from "../../context/TestContext";
import { getTestParticipantsById } from "../../services/tests";
import { BackButton } from "../../shared/components/BackButton";
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
  const [participants, setParticipants] = useState([]);
  const [participantsLoading, setParticipantsLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [sortingValues, setSortingValues] = useState(DEFAULT_SORTING_VALUES);
  const [searchString, setSearchString] = useState("");
  const [pageSize, setPageSize] = useState(INITIAL_PAGE_SIZE);
  const [visible, setVisible] = useState(false);
  const [currentParticipant, setCurrentParticipant] = useState(null);
  const { getTest, test, testLoading } = useContext(TestContext);

  useEffect(() => {
    fetchTest();
  }, [params.id]); /* eslint-disable-line */

  useEffect(() => {
    if (test) {
      fetchParticipants();
    }
  }, [test, pageNumber, pageSize, sortingValues]); /* eslint-disable-line */

  const fetchTest = () => getTest(params.id);

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

  return (
    <Main title="Participants">
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
      `}</style>
    </Main>
  );
};

const HOC = (props) => {
  return (
    <TestProvider>
      <TestParticipants {...props} />
    </TestProvider>
  );
};

export default HOC;
