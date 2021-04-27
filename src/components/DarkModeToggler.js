import React from "react";
import classNames from "classnames";
import { BiMoon, BiSun } from "react-icons/bi";

export default function DarkModeToggler({ currentValue, onChange, className }) {
  const classes = classNames(
    className,
    "w-12 h-12 flex p-1 justify-center items-center my-auto",
    "absolute bg-gray-200 dark:bg-gray-800 inline-flex rounded-full",
    "transition-normal transform "
  );

  return (
    <>
      <div
        className={
          className +
          " bg-indigo-700 transition-normal dark:bg-gray-600 w-16 h-16 absolute transform rounded-full"
        }
      ></div>
      <div
        role="button"
        aria-label="toggle"
        onClick={() => onChange(!currentValue)}
        className={classes}
      >
        {currentValue ? (
          <BiMoon className="text-xl text-white" />
        ) : (
          <BiSun className="text-xl " />
        )}
      </div>
    </>
  );
}
