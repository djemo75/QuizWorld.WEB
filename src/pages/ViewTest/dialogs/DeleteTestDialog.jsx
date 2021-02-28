import { Button, CircularProgress } from "@material-ui/core";
import React, { useContext } from "react";

import { TestContext } from "../../../context/TestContext";
import { CustomDialog } from "../../../shared/components/CustomDialog";

export const DeleteTestDialog = ({ test, visible, handleClose }) => {
  const { deleteTest, deleteTestLoading } = useContext(TestContext);

  const handleDelete = () => deleteTest(test.id);

  return (
    <>
      <CustomDialog title={test.name} visible={visible}>
        Are you sure you want to delete this test?
        <div className="actions">
          <Button
            color="primary"
            className="cancel-btn"
            onClick={handleClose}
            disabled={deleteTestLoading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="submit-btn"
            onClick={handleDelete}
            disabled={deleteTestLoading}
            startIcon={deleteTestLoading && <CircularProgress size="20px" />}
          >
            Delete
          </Button>
        </div>
      </CustomDialog>
    </>
  );
};
