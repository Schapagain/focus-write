import React, { useEffect, useState } from "react";
import EditorPanel from "./EditorPanel";
import classNames from "classnames";
import { getFromLocalStorage } from "../utils";
import Sidebar from "./Sidebar";

export default function MainContainer() {
  const [dark, setDark] = useState(() => getFromLocalStorage("dark"));

  const classes = classNames(
    "transition-normal",
    "flex dark:bg-theme-dark w-screen bg-theme",
    "h-screen w-full"
  );

  useEffect(() => {
    const html = document.getElementById("htmlElement");
    if (dark) html.classList.add("dark");
    else html.classList.remove("dark");
  }, [dark]);

  return (
    <div className={classes}>
      <div className="flex mx-auto items-center flex-col w-full h-full max-w-screen-xl">
        <div className="relative w-full h-full flex p-20 justify-center">
          <EditorPanel dark={dark} setDark={setDark} />
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
