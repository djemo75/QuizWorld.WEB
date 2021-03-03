import { Box } from "@material-ui/core";
import React from "react";
import ReactQuill from "react-quill";

export const TextEditor = ({ onChange, value, placeholder, disabled }) => {
  const modules = {
    toolbar: {
      container: [
        ["bold", "italic", "underline"],
        [{ header: 1 }, { header: 2 }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ color: [] }, { background: [] }],
        [{ size: ["small", false, "large"] }],
        ["clean"],
      ],
    },
  };

  return (
    <>
      <Box className="editor">
        <ReactQuill
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          readOnly={disabled}
          modules={modules}
        />
      </Box>
      <style jsx>{`
        :global(.editor) {
          margin: 8px 0px;
        }
        :global(.editor .ql-toolbar) {
          border-radius: 4px 4px 0px 0px;
        }
        :global(.editor .ql-container) {
          border-radius: 0px 0px 4px 4px;
        }
        :global(.editor .ql-editor.ql-blank::before) {
          font-style: normal;
          font-size: 16px;
        }
      `}</style>
    </>
  );
};
