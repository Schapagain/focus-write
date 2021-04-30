import React, { useContext, useEffect } from "react";
import EditorPanel from "./EditorPanel";
import classNames from "classnames";
import Sidebar from "./Sidebar";
import { AppContext } from "../context/AppContext";
import DocumentsContextProvider from "../context/DocumentsContext";

export default function MainContainer() {
  const { theme, page } = useContext(AppContext);
  const classes = classNames(
    "transition-normal",
    "flex dark:bg-theme-dark w-screen bg-theme",
    "h-screen w-full"
  );

  useEffect(() => {
    const html = document.getElementById("htmlElement");
    if (theme) {
      theme.dark ? html.classList.add("dark") : html.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className={classes}>
      <div className="flex mx-auto items-center flex-col w-full h-full max-w-screen-xl">
        <div className="relative w-full h-full flex p-20 justify-center">
          <DocumentsContextProvider>
            <EditorPanel />
            <Sidebar />
          </DocumentsContextProvider>
        </div>
      </div>
    </div>
  );
}
