import React, { useContext, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import DarkModeToggler from "./DarkModeToggler";
import { DocumentsContext } from "../context/DocumentsContext";
import DocumentTitle from "./DocumentTitle";
import { AppContext } from "../context/AppContext";

export default function EditorPanel() {
  const [content, setContent] = useState("");
  const [lastSaved, setLastSaved] = useState("");
  const [document, setDocument] = useState({});

  const { updateDocument, currentDocument, isLoading } = useContext(
    DocumentsContext
  );

  const { theme, changeTheme } = useContext(AppContext);

  const editorRef = useRef(null);
  const handleChange = () => {
    setContent(editorRef.current.innerText);
  };

  const classes = classNames(
    "focus:outline-none dark:bg-gray-800 ",
    "h-full w-full flex flex-col bg-gray-200 font-bitter",
    "p-10 text-xl rounded-sm text-gray-900 dark:text-gray-100",
    "overflow-y-auto no-scrollbar",
    "transition-normal"
  );

  useEffect(() => {
    if (document.id != currentDocument.id && lastSaved != content) {
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
      editorRef.current.innerText = document.content || "";
      setContent(document.content);
      setLastSaved(document.content);
      editorRef.current.focus();
    }
  }, [document]);

  const toggleDarkMode = () => {
    changeTheme({ ...theme, dark: !theme.dark });
  };

  return (
    <div className="flex flex-col w-full">
      <div className="text-white animate-fade-in text-center w-1/2 mx-auto mb-3 h-0.5/12">
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
        <div
          ref={editorRef}
          contentEditable={true}
          onInput={handleChange}
          className={classes}
        ></div>
        <DarkModeToggler
          onChange={toggleDarkMode}
          currentValue={theme && theme.dark}
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
