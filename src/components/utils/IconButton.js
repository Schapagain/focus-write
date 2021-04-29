import classNames from "classnames";
import React from "react";

export default function IconButton({ onClick, children }) {
  const classes = classNames(
    " overflow-hidden w-10 h-10 flex p-1 justify-center items-center my-auto",
    "z-30 bg-gray-200 dark:bg-gray-800 inline-flex rounded-full",
    "transition-fast transform hover:scale-110 hover:rotate-180"
  );

  return (
    <div
      role="button"
      aria-label="add new document"
      onClick={onClick}
      className={classes}
    >
      {children}
    </div>
  );
}
