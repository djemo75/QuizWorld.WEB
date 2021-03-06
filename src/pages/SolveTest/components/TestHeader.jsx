import { Box, Button, Chip, Paper } from "@material-ui/core";
import { Timelapse } from "@material-ui/icons";
import Alert from "@material-ui/lab/Alert";
import React from "react";

import { ACTIVE_TEST } from "../../../constants/tests";
import { SanitizeHtml } from "../../../shared/components/SanitizeHtml";
import { TestTimer } from "./TestTimer";

export const TestHeader = ({
  test,
  shoudShowTimer,
  setConfirmDialog,
  fetchQuestions,
  score,
}) => {
  const handleStart = () => {
    fetchQuestions();
  };

  return (
    <>
      <Box
        className="test-header"
        component={Paper}
        display="flex"
        justifyContent="space-between"
        bgcolor="primary.dark"
        color="primary.contrastText"
        padding="16px 30px"
      >
        <Box display="flex" alignItems="center" className="left-side">
          <div className="test-title">{test.name}</div>
          <Box
            display="flex"
            alignItems="center"
            className="status-and-duration"
          >
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
            <Chip
              label={test.duration ? <>{test.duration} min</> : "unlimited"}
              variant="outlined"
              className="test-status"
              avatar={<Timelapse />}
            />
          </Box>
        </Box>

        <Box className="right-side">
          {shoudShowTimer ? (
            <TestTimer
              duration={test.duration}
              setConfirmDialog={setConfirmDialog}
              score={score}
            />
          ) : (
            <>
              {test.status === ACTIVE_TEST && test.accessForSolving && (
                <Box display="flex" alignItems="center" color="#FFF">
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    className="submit-btn"
                    onClick={handleStart}
                    style={{
                      background: "#19d320",
                      color: "#fff",
                    }}
                  >
                    Start
                  </Button>
                </Box>
              )}
            </>
          )}
        </Box>
      </Box>

      <Box className="test-description">
        {test.accessForSolving ? (
          <>
            {test.status === ACTIVE_TEST ? (
              test.description && (
                <Alert severity="info" className="alert">
                  <SanitizeHtml html={test.description} />
                </Alert>
              )
            ) : (
              <Alert severity="warning" className="alert">
                The test is not active. Please try again later!
              </Alert>
            )}
          </>
        ) : (
          <Box>
            <Alert severity="error" className="alert">
              You are not included in the list of participants. Please contact
              the test creator.
            </Alert>
          </Box>
        )}
      </Box>
      <style jsx>{`
        .test-title {
          font-size: 22px;
          margin-right: 20px;
        }
        :global(.test-status) {
          margin-left: 10px;
          color: #fff;
          border: 1px solid #fff;
        }
        :global(.test-status.MuiChip-root .MuiChip-avatar) {
          color: #fff !important;
        }
        :global(.test-description) {
          margin-top: 20px;
        }
        :global(.test-description .alert) {
          white-space: pre-wrap;
          background: #fff;
        }
        @media screen and (max-width: 600px) {
          :global(.test-header) {
            flex-direction: column;
            padding: 16px;
          }
          :global(.test-header .right-side) {
            justify-content: center;
          }
          :global(.test-header .left-side) {
            flex-direction: column;
          }
          :global(.test-header .left-side .status-and-duration) {
            width: 100%;
            justify-content: space-between;
            margin-bottom: 10px;
          }
          :global(.test-header .left-side .test-title) {
            width: 100%;
            margin-right: 0px;
          }
        }
      `}</style>
    </>
  );
};
