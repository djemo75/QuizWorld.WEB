import { Box, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";

import { INITIAL_PAGE_SIZE } from "../../constants/table";
import { getAllUsers } from "../../services/users";
import { CustomTable } from "../../shared/components/CustomTable";
import { Main } from "../../shared/components/Main";
import { SearchButton } from "../../shared/components/SearchButton";
import { errorNotification } from "../../utils/notifications";
import { usersTableColumns } from "./constants";

const DEFAULT_SORTING_VALUES = {
  sortBy: null,
  sortDirection: "desc",
};

const Users = (props) => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
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
      const { data } = await getAllUsers(params);
      setUsers(data.users);
      setTotalCount(data.totalCount);
      setLoading(false);
    } catch (error) {
      errorNotification(error);
      setLoading(false);
    }
  };

  return (
    <Main title="Users">
      <Box display="flex" alignItems="center">
        <TextField
          placeholder="Search by username ..."
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
        columns={usersTableColumns}
        data={users}
        totalCount={totalCount}
        pageNumber={pageNumber}
        pageSize={pageSize}
        handleChangePage={(page) => setPageNumber(page)}
        handleChangePageSize={setPageSize}
        sortingValues={sortingValues}
        setSortingValues={setSortingValues}
        loading={loading}
      />
    </Main>
  );
};

export default Users;
