import { Box, LinearProgress, Tooltip } from "@material-ui/core";
import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";

import { STATIC_ROUTES } from "../../routes";

export const resultsTableColumns = [
  {
    columnName: "Test name",
    fieldName: "name",
    render: (rowData) => (
      <Tooltip title="View Result" placement="top" arrow>
        <Link
          to={STATIC_ROUTES.viewTestResult
            .replace(":id", rowData.testId)
            .replace(":resultId", rowData.id)}
        >
          {rowData.name}
        </Link>
      </Tooltip>
    ),
  },
  {
    columnName: "Score",
    fieldName: "score",
    render: ({ totalQuestions, totalCorrectAnswers }) => (
      <Box maxWidth="150px">
        <Box textAlign="center">
          {totalCorrectAnswers} / {totalQuestions}
        </Box>
        <Box>
          <LinearProgress
            variant="determinate"
            value={(totalCorrectAnswers / totalQuestions) * 100}
          />
        </Box>
      </Box>
    ),
  },
  {
    columnName: "Created At",
    fieldName: "createdAt",
    render: (rowData) => (
      <>{moment(rowData.createdAt).format("MMM. D, YYYY [at] h:mm A z")}</>
    ),
  },
];
