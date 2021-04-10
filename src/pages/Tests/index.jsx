import { Box, Button, TextField } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";

import { INITIAL_PAGE_SIZE } from "../../constants/table";
import { AuthContext } from "../../context/AuthContext";
import TestProvider, { TestContext } from "../../context/TestContext";
import { CustomTable } from "../../shared/components/CustomTable";
import { Main } from "../../shared/components/Main";
import { SearchButton } from "../../shared/components/SearchButton";
import { testTableColumns } from "./constants";
import { TestFormDialog } from "./dialogs/TestFormDialog";

const DEFAULT_SORTING_VALUES = {
  sortBy: "createdAt",
  sortDirection: "desc",
};

const Tests = (props) => {
  const [visible, setVisible] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(INITIAL_PAGE_SIZE);
  const [sortingValues, setSortingValues] = useState(DEFAULT_SORTING_VALUES);
  const [searchString, setSearchString] = useState("");
  const {
    getTests,
    tests,
    testsTotal,
    testsLoading,
    createTest,
    createTestLoading,
  } = useContext(TestContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchData();
  }, [pageNumber, pageSize, sortingValues]); /* eslint-disable-line */

  const fetchData = async () => {
    let params = { pageNumber, pageSize, searchString };

    const { sortBy, sortDirection } = sortingValues;
    if (sortBy && sortDirection) {
      params = { ...params, sortBy, sortDirection };
    }

    getTests(params);
  };

  const handleCreate = (values) => {
    createTest(values, () => {
      fetchData();
      setVisible(false);
    });
  };

  return (
    <Main
      title="Tests"
      buttons={
        <Button
          variant="contained"
          color="primary"
          onClick={() => setVisible(true)}
        >
          Create
        </Button>
      }
    >
      <Box display="flex" alignItems="center">
        <TextField
          placeholder="Search by test name ..."
          name="searchString"
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
          onKeyPress={({ charCode }) => charCode === 13 && fetchData()}
          variant="outlined"
          size="small"
        />
        <SearchButton onClick={() => fetchData()} />
      </Box>

      <CustomTable
        columns={testTableColumns(user)}
        data={tests}
        totalCount={testsTotal}
        pageNumber={pageNumber}
        pageSize={pageSize}
        handleChangePage={(page) => setPageNumber(page)}
        handleChangePageSize={setPageSize}
        sortingValues={sortingValues}
        setSortingValues={setSortingValues}
        loading={testsLoading}
      />

      <TestFormDialog
        visible={visible}
        handleClose={() => setVisible(false)}
        handleSubmit={handleCreate}
        loading={createTestLoading}
      />
    </Main>
  );
};

const HOC = (props) => {
  return (
    <TestProvider>
      <Tests {...props} />
    </TestProvider>
  );
};

export default HOC;
