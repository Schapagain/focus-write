import React, { useContext, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import DarkModeToggler from "./DarkModeToggler";
import { saveToLocalStorage } from "../utils";
import { DocumentsContext } from "../context/DocumentsContext";
import DocumentTitle from "./DocumentTitle";

export default function EditorPanel({ dark, setDark }) {
  const [content, setContent] = useState("");

  const [lastSaved, setLastSaved] = useState("");
  const [message, setMessage] = useState("");
  const [document, setDocument] = useState({});

  const { updateDocument, currentDocument, isLoading } = useContext(
    DocumentsContext
  );

  const editorRef = useRef(null);
  const handleChange = () => {
    setContent(editorRef.current.innerHTML);
  };

  const classes = classNames(
    "focus:outline-none dark:bg-gray-800 transition-normal",
    "h-full w-full flex flex-col bg-gray-200 font-bitter",
    "p-10 text-2xl rounded-sm text-gray-900 dark:text-gray-100",
    "overflow-y-auto no-scrollbar"
  );

  const handleDarkModeChange = (dark) => {
    setDark(dark);
    saveToLocalStorage({ dark });
  };

  useEffect(() => {
    if (lastSaved != content) {
      updateDocument({ id: document.id, content });
    }
    setDocument(currentDocument);
  }, [currentDocument]);

  useEffect(() => {
    var intervalId = setInterval(function () {
      if (lastSaved != content) {
        updateDocument({ id: document.id, content });
        setLastSaved(content);
      }
    }, 5000);
    return () => {
      clearInterval(intervalId);
    };
  });

  useEffect(() => {
    if (editorRef) {
      editorRef.current.innerHTML = document.content;
      setContent(document.content);
      setLastSaved(document.content);
      editorRef.current.focus();
    }
  }, [document]);

  return (
    <div className="flex flex-col w-full">
      <div className="text-white animate-fade-in text-center w-1/2 mx-auto mb-3 h-0.5/12 p-3">
        <DocumentTitle
          title={document.title}
          onChange={(title) => updateDocument({ id: document.id, title })}
        />
      </div>
      <div className="relative h-11.5/12">
        {isLoading > 0 && (
          <span className="absolute top-0 right-0 transform -translate-x-8 mx-5 -translate-y-full text-white">
            Saving...
          </span>
        )}
        {message && (
          <span className="absolute top-0 left-0 transform -translate-y-full text-white">
            {message}
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
    </div>
  );
}

EditorPanel.defaultProps = {
  document: {},
  setDark: () => null,
};
