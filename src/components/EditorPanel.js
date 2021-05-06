import React, { useContext, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import DarkModeToggler from "./DarkModeToggler";
import { DocumentsContext } from "../context/DocumentsContext";
import DocumentTitle from "./DocumentTitle";
import { AppContext } from "../context/AppContext";
import { placeCaretAtEnd } from "../utils";

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
    setContent(editorRef.current.innerHTML);
    updateDocument({ id: document.id, content: editorRef.current.innerHTML });
  };

  const classes = classNames(
    "focus:outline-none dark:bg-gray-800 ",
    "h-full w-full flex flex-col bg-gray-200 font-bitter",
    "p-10 text-xl rounded-sm text-gray-900 dark:text-gray-100",
    "overflow-y-auto no-scrollbar",
    "transition-normal"
  );

  useEffect(() => {
    if (document.id != currentDocument.id) {
      setDocument(currentDocument);
      if (lastSaved != content) updateDocument({ id: document.id, content });
      console.log("current document changed to:", currentDocument);
    }
  }, [currentDocument]);

  useEffect(() => {
    if (editorRef?.current) {
      editorRef.current.innerHTML = document.content || "";
      setContent(document.content);
      setLastSaved(document.content);
      placeCaretAtEnd(editorRef.current);
    }
  }, [document]);

  const toggleDarkMode = () => {
    changeTheme({ ...theme, dark: !theme.dark });
  };

  const handleTitleChange = (title) => {
    if (editorRef?.current) placeCaretAtEnd(editorRef.current);
    updateDocument({ id: document.id, title });
  };

  return (
    <div className="flex flex-col w-full">
      <div className="text-white animate-fade-in text-center w-1/2 mx-auto mb-3 h-0.5/12">
        <DocumentTitle title={document.title} onChange={handleTitleChange} />
      </div>
      <div className="relative h-11.5/12">
        {isLoading > 0 && (
          <span className="absolute text-xs top-0 right-0 transform -translate-x-4 mx-5 -translate-y-full text-white">
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
