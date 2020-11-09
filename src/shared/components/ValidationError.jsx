import React from "react";

export const ValidationError = ({ error }) => {
  return (
    <>
      <div className="validation-error">{error && error}</div>
      <style jsx>{`
        .validation-error {
          color: red;
          font-size: 13px;
        }
      `}</style>
    </>
  );
};
