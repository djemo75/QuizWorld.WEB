import { CircularProgress } from "@material-ui/core";
import React from "react";

export const LoadingScreen = () => {
  return (
    <>
      <div className="loading-screen">
        <CircularProgress />
      </div>
      <style jsx>{`
        .loading-screen {
          min-height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </>
  );
};
