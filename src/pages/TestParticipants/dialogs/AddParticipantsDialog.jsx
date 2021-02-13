import { Button, CircularProgress, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { addParticipant } from "../../../services/tests";
import { CustomDialog } from "../../../shared/components/CustomDialog";
import {
  errorNotification,
  successNotification,
} from "../../../utils/notifications";

export const AddParticipantsDialog = ({
  visible,
  handleClose,
  fetchParticipants,
}) => {
  const params = useParams();
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    try {
      setLoading(true);
      await addParticipant(params.id, { username: value });
      successNotification("Added successfully!");
      setLoading(false);
      fetchParticipants();
      handleClose();
    } catch (e) {
      errorNotification(e);
      setLoading(false);
    }
  };

  if (!visible) {
    return null;
  }

  return (
    <>
      <CustomDialog title="Add participants" visible={visible}>
        <TextField
          variant="outlined"
          label="Username"
          placeholder="Username"
          name="joinCode"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          size="small"
          fullWidth
        />
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
            onClick={handleAdd}
            disabled={loading || !value}
            startIcon={loading && <CircularProgress size="20px" />}
          >
            Add
          </Button>
        </div>
      </CustomDialog>
    </>
  );
};
