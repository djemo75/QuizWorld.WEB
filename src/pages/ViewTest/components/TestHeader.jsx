import {
  Box,
  Button,
  Chip,
  IconButton,
  Paper,
  Tooltip,
} from "@material-ui/core";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import copy from "copy-to-clipboard";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import { ACTIVE_TEST } from "../../../constants/tests";
import { AuthContext } from "../../../context/AuthContext";
import { STATIC_ROUTES } from "../../../routes";

export const TestHeader = ({ test }) => {
  const history = useHistory();
  const { user, isAdmin } = useContext(AuthContext);

  const handleCopy = (text) => {
    copy(text);
    toast.success("Copied to clipboard.");
  };

  return (
    <>
      <Box
        component={Paper}
        display="flex"
        justifyContent="space-between"
        bgcolor="primary.dark"
        color="primary.contrastText"
        padding="16px 30px"
      >
        <Box display="flex" alignItems="center">
          <div className="test-title">{test.name}</div>
          <Chip
            variant="default"
            label={test.status}
            size="small"
            style={{
              minWidth: "80px",
              textTransform: "capitalize",
              background: `${
                test.status === ACTIVE_TEST ? "#19d320" : "#f50000"
              }`,
              color: "#fff",
            }}
          />
          {test.status === ACTIVE_TEST && (
            <Box display="flex" alignItems="center" marginLeft="15px">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={() => {
                  history.push(STATIC_ROUTES.solveTest.replace(":id", test.id));
                }}
                style={{
                  background: "#19d320",
                  color: "#fff",
                }}
              >
                Start
              </Button>
            </Box>
          )}
        </Box>
        {test.joinCode && (isAdmin || user.id === test.user.id) && (
          <Box display="flex" alignItems="center" color="#FFF">
            <div className="code-label">
              <div className="code-label-text">JOIN CODE</div>
              <div className="code-description">Used to join in test</div>
            </div>
            <div className="code">{test.joinCode}</div>
            <Tooltip title="Copy" placement="top" arrow>
              <IconButton
                className="copy-button"
                size="small"
                onClick={() => handleCopy(test.joinCode)}
              >
                <FileCopyOutlinedIcon color="primary" />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      </Box>
      <style jsx>{`
        .test-title {
          font-size: 22px;
          margin-right: 20px;
        }
        .code-label {
          margin-right: 20px;
        }
        .code-label-text {
          font-size: 18px;
        }
        .code-description {
          margin-top: -3px;
          font-size: 11px;
          color: #2196f3;
        }
        .code {
          font-size: 28px;
          letter-spacing: 5px;
        }
        :global(.copy-button svg) {
          height: 14px;
          width: 14px;
        }
      `}</style>
    </>
  );
};
