import React from "react";

export const ResponseError = ({ error, textAlign }) => {
  return (
    <>
      <div className="response-error">{error && error}</div>
      <style jsx>{`
        .response-error {
          color: red;
          font-size: 16px;
          text-align: ${textAlign ? textAlign : "left"};
        }
      `}</style>
    </>
  );
};
