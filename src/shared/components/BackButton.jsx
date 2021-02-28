import { IconButton } from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import React from "react";
import { useHistory } from "react-router-dom";

export const BackButton = ({ onClick }) => {
  const history = useHistory();

  return (
    <>
      <IconButton
        className="back-button"
        size="small"
        onClick={() => (onClick ? onClick() : history.goBack())}
      >
        <KeyboardBackspaceIcon />
      </IconButton>
      <style jsx>{`
        :global(.back-button) {
          border: 1px solid #fff;
          background: rgba(255, 255, 255, 0.1);
          margin-right: 15px;
        }
        :global(.back-button:hover) {
          background: #e6e6e6;
        }
        :global(.back-button svg) {
          color: #fff;
        }
        :global(.back-button:hover svg) {
          color: #2196f3;
        }
      `}</style>
    </>
  );
};
