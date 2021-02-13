import { CircularProgress } from "@material-ui/core";
import React from "react";

export const LoadingScreen = ({ fullHeight }) => {
  return (
    <>
      <div className="loading-screen">
        <CircularProgress />
      </div>
      <style jsx>
        {`
          .loading-screen {
            width: 100%;
            min-height: ${fullHeight ? "100%" : "0%"};
            display: flex;
            justify-content: center;
            align-items: center;
          }
        `}
      </style>
    </>
  );
};
