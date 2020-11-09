import { Typography } from "@material-ui/core";
import React from "react";

export const Main = ({ title, children }) => {
  return (
    <>
      <div className="main">
        {title && <Typography variant="h4">{title}</Typography>}
        {children}
      </div>
      <style jsx>{`
        .main {
          padding: 24px 24px 0 24px;
        }
      `}</style>
    </>
  );
};
