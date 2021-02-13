import { Button, CircularProgress } from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { STATIC_ROUTES } from "../../../../routes";
import { deleteTestById } from "../../../../services/tests";
import { CustomDialog } from "../../../../shared/components/CustomDialog";
import {
  errorNotification,
  successNotification,
} from "../../../../utils/notifications";

export const DeleteTestDialog = ({ test, visible, handleClose }) => {
  const [loading, setLoading] = useState(null);
  const history = useHistory();

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteTestById(test.id);
      successNotification("Deleted successfully!");
      setLoading(false);
      history.push(STATIC_ROUTES.tests);
    } catch (error) {
      errorNotification(error);
      setLoading(false);
    }
  };

  return (
    <>
      <CustomDialog title={test.name} visible={visible}>
        Are you sure you want to delete this test?
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
