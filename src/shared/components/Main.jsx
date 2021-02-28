import { Typography } from "@material-ui/core";
import React from "react";

export const Main = ({ title, children, buttons }) => {
  return (
    <>
      <div className="main">
        <div className="main-header">
          <Typography variant="h3">{title}</Typography>
          {buttons && <div>{buttons}</div>}
        </div>
        <div className="main-content">{children}</div>
      </div>
      <style jsx>{`
        .main {
          padding: 24px 24px 0 24px;
        }
        .main-header {
          display: flex;
          justify-content: space-between;
          min-height: ${!title && !buttons ? "0px" : "36px"};
          margin-bottom: 10px;
        }
        .main-content {
          padding-bottom: 50px;
        }
      `}</style>
    </>
  );
};
