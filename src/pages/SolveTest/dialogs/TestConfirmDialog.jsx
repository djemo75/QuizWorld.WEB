import { Button, CircularProgress } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import React from "react";
import { useHistory } from "react-router-dom";

import { STATIC_ROUTES } from "../../../routes";
import { CustomDialog } from "../../../shared/components/CustomDialog";

export const TestConfirmDialog = ({
  visible,
  handleClose,
  hasTime = true,
  sendTestForSolving,
  score,
  isSubmiting,
}) => {
  const history = useHistory();

  const handleSend = () => {
    sendTestForSolving();
  };

  const handleRedirect = () => {
    history.push(STATIC_ROUTES.myResults);
  };

  return (
    <>
      <CustomDialog title="Passing a test" maxWidth="xs" visible={visible}>
        <div className="description">
          {score ? (
            <>
              <Alert severity="success">
                You have {score.totalCorrectAnswers} correct answers out of{" "}
                {score.totalQuestions}
              </Alert>
            </>
          ) : (
            <>
              {hasTime
                ? "Are you sure you want to pass the test, you still have time"
                : "Your time is up, please pass the test, otherwise the test will not be considered"}
            </>
          )}
        </div>

        <div className="actions">
          {score ? (
            <Button color="primary" onClick={handleRedirect}>
              Close
            </Button>
          ) : (
            <>
              {hasTime && (
                <Button
                  color="primary"
                  className="cancel-btn"
                  onClick={handleClose}
                  disabled={isSubmiting}
                >
                  Cancel
                </Button>
              )}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="submit-btn"
                onClick={handleSend}
                disabled={isSubmiting}
                startIcon={isSubmiting && <CircularProgress size="20px" />}
              >
                Send
              </Button>
            </>
          )}
        </div>
      </CustomDialog>
      <style jsx>{`
        .description {
          margin-bottom: 10px;
        }
        :global(.validation-error) {
          text-align: center;
          margin: 10px 0px;
        }
      `}</style>
    </>
  );
};
