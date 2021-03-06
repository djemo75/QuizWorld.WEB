import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from "@material-ui/core";
import { isEmpty } from "lodash";
import React from "react";

import { TABLE_PAGE_SIZE_OPTIONS } from "../../constants/table";

export const CustomTable = ({
  columns,
  data,
  totalCount,
  pageNumber,
  pageSize,
  loading,
  handleChangePage,
  handleChangePageSize,
  noRecordsText = "No Records found",
  enablePagination = true,
  sortingValues,
  setSortingValues,
}) => {
  const handleChangeSorting = (column) => {
    if (column.sortable) {
      if (sortingValues.sortBy === column.fieldName) {
        setSortingValues({
          sortBy: column.fieldName,
          sortDirection: sortingValues.sortDirection === "asc" ? "desc" : "asc",
        });
      } else {
        setSortingValues({
          sortBy: column.fieldName,
          sortDirection: "asc",
        });
      }
    }
  };

  const getTableHeadContent = () => {
    return (
      <TableRow>
        {!isEmpty(columns)
          ? columns.map((column, index) => (
              <TableCell
                key={index}
                onClick={() => handleChangeSorting(column)}
              >
                <div className={column.sortable ? "sortable-column" : ""}>
                  {column.columnName}
                  {column.sortable && (
                    <TableSortLabel
                      active={sortingValues.sortBy === column.fieldName}
                      direction={sortingValues.sortDirection}
                    />
                  )}
                </div>
              </TableCell>
            ))
          : null}
      </TableRow>
    );
  };

  const pagination = (
    <TablePagination
      component="div"
      style={{ display: "flex", justifyContent: "center" }}
      count={totalCount ? totalCount : 0}
      page={pageNumber - 1}
      onChangePage={(object, page) => handleChangePage(page + 1)}
      rowsPerPage={pageSize}
      onChangeRowsPerPage={(e) => handleChangePageSize(e.target.value)}
      disabled={loading}
      rowsPerPageOptions={TABLE_PAGE_SIZE_OPTIONS}
    />
  );

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>{getTableHeadContent()}</TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan="5"
                  height="200px"
                  style={{ textAlign: "center" }}
                >
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              <>
                {!isEmpty(data) ? (
                  <>
                    {data.map((row, index) => (
                      <TableRow key={index}>
                        {!isEmpty(columns)
                          ? columns.map((column, idx) => (
                              <TableCell key={idx} align={column.align}>
                                {column.render
                                  ? column.render(row)
                                  : row[column.fieldName]}
                              </TableCell>
                            ))
                          : null}
                      </TableRow>
                    ))}
                  </>
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan="5"
                      height="200px"
                      style={{ textAlign: "center" }}
                    >
                      {noRecordsText}
                    </TableCell>
                  </TableRow>
                )}
              </>
            )}
          </TableBody>
        </Table>
        {enablePagination && pagination}
      </TableContainer>
      <style jsx>{`
        :global(.MuiTableHead-root .MuiTableCell-root) {
          padding: 22px 16px;
          font-weight: bold;
          white-space: nowrap;
        }
        :global(.MuiTableBody-root .MuiTableCell-root) {
          padding: 10px 16px;
          white-space: nowrap;
        }
        :global(.MuiTableBody-root .MuiTableCell-root a) {
          color: #2196f3;
        }
        :global(.MuiTableHead-root .sortable-column) {
          display: inline;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};
