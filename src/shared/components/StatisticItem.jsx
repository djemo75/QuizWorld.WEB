import { Box, CircularProgress } from "@material-ui/core";
import React from "react";

export const StatisticItem = ({ icon, text, count, onClick, loading }) => {
  return (
    <>
      <div className="statistic-item" onClick={onClick}>
        <Box className="icon-wrapper">{icon}</Box>
        <Box fontSize="0.75rem" px={1} py={0.75}>
          {text}
        </Box>
        <Box className="counter">
          {loading ? (
            <CircularProgress size="16px" style={{ color: "#fff" }} />
          ) : (
            count
          )}
        </Box>
      </div>
      <style jsx>{`
        .statistic-item {
          height: 100px;
          width: 100%;
          border-radius: 7px;
          background: #2196f3;
          color: #fff;
          position: relative;
          overflow: hidden;
          cursor: ${onClick ? "pointer" : "default"};
        }
        :global(.statistic-item .icon-wrapper svg) {
          position: absolute;
          bottom: 0px;
          left: -15px;
          color: rgba(0, 0, 0, 0.3);
          width: 70px;
          height: 70px;
          transition: 1s;
        }
        :global(.statistic-item .counter) {
          position: absolute;
          bottom: 5px;
          right: 8px;
          font-weight: bold;
          font-size: 1.5rem;
        }
        :global(.statistic-item:hover .icon-wrapper svg) {
          width: 85px;
          height: 85px;
          transform: rotate(-5deg);
          color: rgba(0, 0, 0, 0.4);
        }
      `}</style>
    </>
  );
};
