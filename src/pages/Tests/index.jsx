import { Box, Button, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";

import { INITIAL_PAGE_SIZE } from "../../constants/table";
import { createTest, getAllTests } from "../../services/tests";
import { CustomTable } from "../../shared/components/CustomTable";
import { Main } from "../../shared/components/Main";
import { SearchButton } from "../../shared/components/SearchButton";
import {
  errorNotification,
  successNotification,
} from "../../utils/notifications";
import { testTableColumns } from "./constants";
import { TestFormDialog } from "./TestFormDialog";

const DEFAULT_SORTING_VALUES = {
  sortBy: "createdAt",
  sortDirection: "desc",
};

const Tests = (props) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tests, setTests] = useState([]);
  const [totalCount, setTotalCount] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(INITIAL_PAGE_SIZE);
  const [sortingValues, setSortingValues] = useState(DEFAULT_SORTING_VALUES);
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    fetchData();
  }, [pageNumber, pageSize, sortingValues]); /* eslint-disable-line */

  const fetchData = async () => {
    let params = { pageNumber, pageSize, searchString };

    const { sortBy, sortDirection } = sortingValues;
    if (sortBy && sortDirection) {
      params = { ...params, sortBy, sortDirection };
    }

    try {
      setLoading(true);
      const { data } = await getAllTests(params);
      setTests(data.tests);
      setTotalCount(data.totalCount);
      setLoading(false);
    } catch (error) {
      errorNotification(error);
      setLoading(false);
    }
  };

  const handleCreate = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true);
      await createTest(values);
      setSubmitting(false);
      setVisible(false);
      fetchData();
      successNotification("Successfully created!");
    } catch (error) {
      errorNotification(error);
      setSubmitting(false);
    }
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
          variant="outlined"
          size="small"
        />

        <SearchButton onClick={() => fetchData()} />
      </Box>
      <CustomTable
        columns={testTableColumns}
        data={tests}
        totalCount={totalCount}
        pageNumber={pageNumber}
        pageSize={pageSize}
        handleChangePage={(page) => setPageNumber(page)}
        handleChangePageSize={setPageSize}
        sortingValues={sortingValues}
        setSortingValues={setSortingValues}
        loading={loading}
      />
      <TestFormDialog
        visible={visible}
        handleClose={() => setVisible(false)}
        handleSubmit={handleCreate}
      />
    </Main>
  );
};

export default Tests;
