import React from "react";
import sanitizeHtml from "sanitize-html";

export const SanitizeHtml = ({ html }) => {
  const clean = sanitizeHtml(html, {
    allowedAttributes: {
      a: ["href", "name", "target"],
      "*": ["style", "class"],
    },
  });

  return (
    <div
      className="ql-editor"
      style={{ padding: "0px" }}
      dangerouslySetInnerHTML={{
        __html: clean,
      }}
    />
  );
};
