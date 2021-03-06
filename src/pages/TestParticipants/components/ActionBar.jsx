import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import React, { useState } from "react";

import { SearchButton } from "../../../shared/components/SearchButton";
import { AddParticipantsDialog } from "../dialogs/AddParticipantsDialog";

export const ActionBar = ({
  fetchParticipants,
  searchString,
  setSearchString,
}) => {
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down("xs"));
  const [visible, setVisible] = useState(false);

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <TextField
          placeholder="Search by username ..."
          name="searchString"
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
          onKeyPress={({ charCode }) => charCode === 13 && fetchParticipants()}
          variant="outlined"
          size="small"
        />

        <SearchButton onClick={() => fetchParticipants()} />
      </Box>

      <Box textAlign="right">
        <Button
          className="add-participant-button"
          variant="contained"
          color="primary"
          onClick={() => setVisible(true)}
        >
          {isMobileView ? "Add" : "Add Participants"}
        </Button>
      </Box>

      {visible && (
        <AddParticipantsDialog
          visible={visible}
          fetchParticipants={fetchParticipants}
          handleClose={() => setVisible(false)}
        />
      )}
    </Box>
  );
};
