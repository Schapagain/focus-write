import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import DarkModeToggler from "./DarkModeToggler";
import { getFromLocalStorage, saveToLocalStorage } from "../utils";

export default function EditorPanel({ dark, setDark }) {
  const [content, setContent] = useState("");
  const [isLoading, setLoading] = useState(0);
  const [lastSaved, setLastSaved] = useState("");

  const editorRef = useRef(null);
  const handleChange = () => {
    setContent(editorRef.current.innerHTML);
  };

  const classes = classNames(
    "focus:outline-none dark:bg-gray-800 transition-normal",
    "h-full w-full flex flex-col bg-gray-200",
    "p-10 text-xl rounded-sm text-gray-900 dark:text-gray-100"
  );

  const handleSave = (content) => {
    setLoading((loading) => loading + 1);
    saveToLocalStorage({ content, dateSaved: new Date() });
    setTimeout(() => {
      setLoading((loading) => loading - 1);
    }, 1500);
  };

  const handleDarkModeChange = (dark) => {
    setDark(dark);
    saveToLocalStorage({ dark });
  };

  useEffect(() => {
    var intervalId = setInterval(function () {
      if (lastSaved != content) {
        console.log("saving:::", content);
        handleSave(content);
        setLastSaved(content);
      }
    }, 5000);
    return () => {
      console.log("cleaningup....");
      clearInterval(intervalId);
    };
  });

  useEffect(() => {
    const savedContent = getFromLocalStorage("content");
    console.log("got saved content:::", savedContent);
    if (savedContent && editorRef) {
      editorRef.current.innerHTML = savedContent;
    }
  }, []);

  return (
    <div className="w-5/6 h-5/6 m-auto relative">
      {isLoading > 0 && (
        <span className="absolute top-0 right-0 transform -translate-x-8 mx-5 -translate-y-full text-white">
          Saving...
        </span>
      )}
      <div
        ref={editorRef}
        contentEditable={true}
        onInput={handleChange}
        className={classes}
      ></div>
      <DarkModeToggler
        onChange={handleDarkModeChange}
        currentValue={dark}
        className="right-0 top-0 translate-x-1/2 -translate-y-1/2"
        isLoading={isLoading}
      />
    </div>
  );
}
