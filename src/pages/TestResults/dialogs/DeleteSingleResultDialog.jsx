import { Button, CircularProgress } from "@material-ui/core";
import React, { useState } from "react";

import { deleteTestResultByResultId } from "../../../services/tests";
import { CustomDialog } from "../../../shared/components/CustomDialog";
import {
  errorNotification,
  successNotification,
} from "../../../utils/notifications";

export const DeleteSingleResultDialog = ({
  currentResult,
  visible,
  handleClose,
  testId,
  fetchResults,
}) => {
  const [loading, setLoading] = useState(null);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteTestResultByResultId(testId, currentResult.id);
      successNotification("Deleted successfully!");
      setLoading(false);
      fetchResults();
      handleClose();
    } catch (error) {
      errorNotification(error);
      setLoading(false);
    }
  };

  if (!visible) {
    return null;
  }

  return (
    <>
      <CustomDialog
        title={`Are you sure you want to delete ${currentResult.username}'s result?`}
        visible={visible}
      >
        <div className="actions">
          <Button
            color="primary"
            className="cancel-btn"
            onClick={handleClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="submit-btn"
            onClick={handleDelete}
            disabled={loading}
            startIcon={loading && <CircularProgress size="20px" />}
          >
            Delete
          </Button>
        </div>
      </CustomDialog>
    </>
  );
};
