import { Chip, Tooltip } from "@material-ui/core";
import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";

import { ACTIVE_TEST, PUBLIC_TEST } from "../../constants/tests";
import { STATIC_ROUTES } from "../../routes";

export const testTableColumns = (user) => [
  {
    columnName: "Name",
    fieldName: "name",
    render: (rowData) => (
      <Tooltip title="View Details" placement="top" arrow>
        <Link
          to={
            user.role === "admin" ||
            (user.role === "user" && rowData.userId === user.id)
              ? STATIC_ROUTES.viewTest.replace(":id", rowData.id)
              : STATIC_ROUTES.solveTest.replace(":id", rowData.id)
          }
        >
          {rowData.name}
        </Link>
      </Tooltip>
    ),
    sortable: true,
  },
  {
    columnName: "Status",
    fieldName: "status",
    render: (rowData) => (
      <Chip
        variant="default"
        label={rowData.status}
        size="small"
        style={{
          minWidth: "80px",
          textTransform: "capitalize",
          background: `${
            rowData.status === ACTIVE_TEST ? "#19d320" : "#f50000"
          }`,
          color: "#fff",
        }}
      />
    ),
    sortable: true,
  },
  {
    columnName: "Visibility",
    fieldName: "visibility",
    render: (rowData) => (
      <Chip
        variant="outlined"
        label={rowData.visibility}
        color={rowData.visibility === PUBLIC_TEST ? "primary" : "secondary"}
        size="small"
        style={{ minWidth: "60px", textTransform: "capitalize" }}
      />
    ),
    sortable: true,
  },
  {
    columnName: "Duration",
    fieldName: "duration",
    render: (rowData) =>
      rowData.duration ? <>{rowData.duration} min</> : "unlimited",
    sortable: true,
  },
  {
    columnName: "Created At",
    fieldName: "createdAt",
    render: (rowData) => (
      <>{moment(rowData.createdAt).format("MMM. D, YYYY [at] h:mm A z")}</>
    ),
    sortable: true,
  },
];
