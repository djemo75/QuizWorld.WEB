import { Box, Button } from "@material-ui/core";
import React, { useState } from "react";

import { QuestionFormDialog } from "./QuestionFormDialog";

export const QuestionsActionBar = ({ fetchQuestions }) => {
  const [visible, setVisible] = useState(false);
  return (
    <Box textAlign="right">
      <Button
        variant="contained"
        color="primary"
        onClick={() => setVisible(true)}
      >
        Add Question
      </Button>
      <QuestionFormDialog
        visible={visible}
        handleClose={() => setVisible(false)}
        fetchQuestions={fetchQuestions}
      />
    </Box>
  );
};
