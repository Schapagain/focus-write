import React from "react";
import classNames from "classnames";

export default function Button({
  size = "lg",
  text,
  variant = "default",
  borderColor = "theme",
  color = "theme",
  className = "",
  onClick,
  isLoading,
}) {
  const mainClass = classNames(
    className,
    "flex items-center justify-center relative",
    "text-xs text-center",
    "outline-none focus:outline-none",
    "transition duration-300 ease-in-out",
    {
      "pointer-events-none": isLoading,
      "py-3 px-10": size === "lg",
      "py-3 px-5": size === "md",
      "p-1": size === "sm",

      [`border-2 text-${borderColor}-light hover:bg-opacity-70 hover:text-${borderColor}-dark border-${borderColor}`]:
        variant === "bordered",
      [`bg-${color} text-white hover:opacity-80`]: variant === "default",
      [`bg-transparent hover:text-${color}-light text-${color}`]:
        variant === "link",
    }
  );
  return (
    <button
      className={mainClass}
      onClick={(e) => {
        onClick(e);
      }}
    >
      <p>{text}</p>
    </button>
  );
}

Button.defaultProps = {
  onClick: () => {},
};
