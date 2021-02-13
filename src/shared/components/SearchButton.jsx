import { Button } from "@material-ui/core";
import { SearchRounded } from "@material-ui/icons";
import React from "react";

export const SearchButton = ({
  onClick,
  className,
  color = "primary",
  variant = "contained",
}) => {
  return (
    <>
      <Button
        variant={variant}
        color={color}
        className={`search-button ${className ? className : ""}`}
        onClick={onClick}
      >
        <SearchRounded />
      </Button>
      <style jsx>{`
        :global(.search-button) {
          min-width: 0px;
          height: 39px;
          width: 39px;
          margin: 0 10px;
        }
      `}</style>
    </>
  );
};
