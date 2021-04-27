import React, { useState } from "react";
import EditorPanel from "./EditorPanel";
import DarkModeToggler from "./DarkModeToggler";
import classNames from "classnames";

export default function MainContainer() {
  const [dark, setDark] = useState(false);

  const classes = classNames(
    "transition-normal",
    "flex dark:bg-gray-600 w-screen bg-indigo-700",
    "h-screen w-full"
  );

  const handleDarkModeChange = (dark) => {
    const html = document.getElementById("htmlElement");
    if (dark) html.classList.add("dark");
    else html.classList.remove("dark");
    setDark(dark);
  };

  return (
    <div className={classes}>
      <div className="flex mx-auto items-center flex-col w-full h-full max-w-screen-xl">
        <div className="relative w-full h-full flex justify-center">
          <EditorPanel dark={dark} setDark={handleDarkModeChange} />
        </div>
      </div>
    </div>
  );
}
