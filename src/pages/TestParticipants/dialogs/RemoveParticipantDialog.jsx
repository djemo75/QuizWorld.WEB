import { Button, CircularProgress } from "@material-ui/core";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { removeParticipant } from "../../../services/tests";
import { CustomDialog } from "../../../shared/components/CustomDialog";
import {
  errorNotification,
  successNotification,
} from "../../../utils/notifications";

export const RemoveParticipantDialog = ({
  currentParticipant,
  visible,
  handleClose,
  fetchParticipants,
}) => {
  const params = useParams();
  const [loading, setLoading] = useState(false);

  const handleRemove = async () => {
    try {
      setLoading(true);
      await removeParticipant(params.id, currentParticipant.id);
      successNotification("Removed successfully!");
      setLoading(false);
      fetchParticipants();
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
        title={`Are you sure you want to remove ${currentParticipant.username}?`}
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
            onClick={handleRemove}
            disabled={loading}
            startIcon={loading && <CircularProgress size="20px" />}
          >
            Remove
          </Button>
        </div>
      </CustomDialog>
    </>
  );
};
