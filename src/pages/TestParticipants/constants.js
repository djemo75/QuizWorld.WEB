import { Box, Button } from "@material-ui/core";
import moment from "moment";
import React from "react";

export const testParticipantsTableColumns = (actions) => [
  {
    columnName: "Username",
    fieldName: "username",
    sortable: true,
  },
  {
    columnName: "Added At",
    fieldName: "createdAt",
    render: (rowData) => (
      <>{moment(rowData.createdAt).format("MMM. D, YYYY [at] h:mm A z")}</>
    ),
    sortable: true,
  },
  {
    render: ({ id, username }) => (
      <Box textAlign="right">
        <Button
          variant="outlined"
          color="secondary"
          size="small"
          onClick={() => actions.remove({ id, username })}
        >
          Delete
        </Button>
      </Box>
    ),
  },
];
