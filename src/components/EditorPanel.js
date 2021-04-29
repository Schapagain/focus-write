import React, { useContext, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import DarkModeToggler from "./DarkModeToggler";
import { saveToLocalStorage } from "../utils";
import { DocumentsContext } from "../context/DocumentsContext";
import NewDocumentButton from "./NewDocumentButton";

export default function EditorPanel({ dark, setDark }) {
  const [content, setContent] = useState("");

  const [lastSaved, setLastSaved] = useState("");
  const [message, setMessage] = useState("");
  const [document, setDocument] = useState({});

  const {
    updateDocument,
    currentDocument,
    isLoading,
    addDocument,
  } = useContext(DocumentsContext);

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
      updateDocument(document.id, content);
    }
    setDocument(currentDocument);
  }, [currentDocument]);

  useEffect(() => {
    var intervalId = setInterval(function () {
      if (lastSaved != content) {
        updateDocument(document.id, content);
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
    }
  }, [document]);

  return (
    <div className="w-5/6 h-5/6 m-auto relative">
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
      <div className="absolute top-0 left-1/2 transform -translate-y-full -translate-x-1/2 text-white text-3xl p-1">
        {document.title}
      </div>
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
      <NewDocumentButton
        onClick={addDocument}
        className="left-0-0 top-0 -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
}

EditorPanel.defaultProps = {
  document: {},
  setDark: () => null,
};
