import { Box, TextField } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";

import { INITIAL_PAGE_SIZE } from "../../constants/table";
import ResultProvider, { ResultContext } from "../../context/ResultContext";
import { CustomTable } from "../../shared/components/CustomTable";
import { Main } from "../../shared/components/Main";
import { SearchButton } from "../../shared/components/SearchButton";
import { resultsTableColumns } from "./constants";

const MyResults = (props) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(INITIAL_PAGE_SIZE);
  const [searchString, setSearchString] = useState("");
  const { results, resultsLoading, resultsTotal, getAllMyResults } = useContext(
    ResultContext,
  );

  useEffect(() => {
    fetchData();
  }, [pageNumber, pageSize]); /* eslint-disable-line */

  const fetchData = () => {
    const requestParams = { pageNumber, pageSize, searchString };
    getAllMyResults(requestParams);
  };

  return (
    <Main title="My results">
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
        columns={resultsTableColumns}
        data={results}
        totalCount={resultsTotal}
        pageNumber={pageNumber}
        pageSize={pageSize}
        handleChangePage={(page) => setPageNumber(page)}
        handleChangePageSize={setPageSize}
        loading={resultsLoading}
      />
    </Main>
  );
};

const HOC = (props) => {
  return (
    <ResultProvider>
      <MyResults {...props} />
    </ResultProvider>
  );
};

export default HOC;
