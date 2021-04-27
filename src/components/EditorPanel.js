import React, { useRef, useState } from "react";
import classNames from "classnames";
import DarkModeToggler from "./DarkModeToggler";

export default function EditorPanel({ dark, setDark }) {
  const [content, setContent] = useState("");

  const editorRef = useRef(null);

  const handleChange = () => {
    console.log(editorRef.current.innerHTML);
    setContent(editorRef.current.innerHTML);
  };

  const classes = classNames(
    "focus:outline-none dark:bg-gray-800 transition-normal",
    "h-full w-full flex flex-col bg-gray-200",
    "p-10 text-xl text-gray-900 dark:text-gray-100"
  );

  return (
    <div className="w-5/6 h-5/6 m-auto relative">
      <div
        ref={editorRef}
        dangerouslySetInnerHTML={{ __html: content }}
        contentEditable={true}
        onInput={handleChange}
        className={classes}
      ></div>
      <DarkModeToggler
        onChange={setDark}
        currentValue={dark}
        className="right-0 top-0 translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
}
