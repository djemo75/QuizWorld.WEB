import { Button, CircularProgress } from "@material-ui/core";
import React, { useState } from "react";

import { deleteQuestionById } from "../../../../services/questions";
import { CustomDialog } from "../../../../shared/components/CustomDialog";
import {
  errorNotification,
  successNotification,
} from "../../../../utils/notifications";

export const DeleteQuestionDialog = ({
  question,
  visible,
  fetchQuestions,
  handleClose,
}) => {
  const [loading, setLoading] = useState(null);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteQuestionById(question.id);
      setLoading(false);
      handleClose();
      await fetchQuestions();
      successNotification("Deleted successfully!");
    } catch (error) {
      errorNotification(error);
      setLoading(false);
    }
  };

  return (
    <>
      <CustomDialog
        title="Are you sure you want to delete this question?"
        visible={visible}
      >
        {question && question.question}
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
