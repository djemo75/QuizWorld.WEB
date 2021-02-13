import { Button, CircularProgress, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { STATIC_ROUTES } from "../../routes";
import { getTestByJoinCode } from "../../services/tests";
import { CustomDialog } from "../components/CustomDialog";
import { ValidationError } from "../components/ValidationError";

export const JoinTestDialog = ({ visible, handleClose }) => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const history = useHistory();

  const handleJoin = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await getTestByJoinCode(value);
      setLoading(false);
      handleClose();
      history.push(STATIC_ROUTES.solveTest.replace(":id", data.id));
    } catch (e) {
      setError(error);
      setLoading(false);
    }
  };

  return (
    <>
      <CustomDialog title="Join to test" maxWidth="xs" visible={visible}>
        <div className="description">
          Use the join code to join the test. Most often used for private tests,
          but can also be used for public.
        </div>
        <TextField
          variant="outlined"
          label="Join Code"
          placeholder="Join Code"
          name="joinCode"
          value={value}
          onChange={(e) => setValue(e.target.value.toUpperCase())}
          size="small"
          fullWidth
        />
        {error && <ValidationError error={error} />}
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
            onClick={handleJoin}
            disabled={loading || !value}
            startIcon={loading && <CircularProgress size="20px" />}
          >
            Join
          </Button>
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
