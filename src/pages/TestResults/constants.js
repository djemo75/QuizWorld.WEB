import { Box, Button, LinearProgress } from "@material-ui/core";
import moment from "moment";
import React from "react";

export const testResultsTableColumns = (actions) => [
  {
    columnName: "Username",
    fieldName: "username",
    sortable: false,
  },
  {
    columnName: "Score",
    fieldName: "score",
    sortable: false,
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
    sortable: false,
  },
  {
    render: ({ id, username }) => (
      <Box textAlign="right">
        <Button
          variant="outlined"
          color="primary"
          size="small"
          style={{ marginRight: "15px" }}
          onClick={() => actions.view({ id, username })}
        >
          View
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          size="small"
          onClick={() => actions.delete({ id, username })}
        >
          Delete
        </Button>
      </Box>
    ),
  },
];
