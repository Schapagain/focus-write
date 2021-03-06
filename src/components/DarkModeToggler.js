import React from "react";
import classNames from "classnames";
import { BiMoon, BiSun } from "react-icons/bi";

export default function DarkModeToggler({ currentValue, onChange, className }) {
  const classes = classNames(
    " overflow-hidden w-12 h-12 flex p-1 justify-center items-center my-auto",
    "absolute z-30 bg-gray-200 dark:bg-gray-800 inline-flex rounded-full",
    "transition-normal transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
  );

  const ringClasses = classNames(
    "w-full block transition-normal h-full absolute inset-0 z-20 transform rounded-full",
    "bg-theme block dark:bg-theme-dark"
  );

  return (
    <div className={className + " w-16 h-16 transform absolute"}>
      <span aria-hidden={true} className={ringClasses}></span>
      <div
        role="button"
        aria-label="dark-mode toggle"
        onClick={() => onChange(!currentValue)}
        className={classes}
      >
        {currentValue ? (
          <BiMoon className="text-xl text-white" />
        ) : (
          <BiSun className="text-xl " />
        )}
      </div>
    </div>
  );
}
