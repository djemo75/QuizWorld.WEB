import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import React from "react";
import { toast } from "react-toastify";

const wrapperStyle = { display: "flex", alignItems: "center" };

export const successNotification = (message) => {
  toast.success(
    <div style={wrapperStyle}>
      <CheckCircleOutlineIcon
        style={{ marginRight: "8px", color: "#188038" }}
      />
      {message}
    </div>,
  );
};

export const errorNotification = (message) => {
  toast.error(
    <div style={wrapperStyle}>
      <HighlightOffIcon style={{ marginRight: "8px", color: "#d93025" }} />
      {message}
    </div>,
  );
};

export const infoNotification = (message) => {
  toast.info(
    <div style={wrapperStyle}>
      <ErrorOutlineIcon style={{ marginRight: "8px", color: "#4285f4" }} />
      {message}
    </div>,
  );
};

export const warningNotification = (message) => {
  toast.warning(
    <div style={wrapperStyle}>
      <ErrorOutlineIcon style={{ marginRight: "8px", color: "#ea8600" }} />
      {message}
    </div>,
  );
};
