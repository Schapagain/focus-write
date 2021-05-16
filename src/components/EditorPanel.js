import React, { useContext, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import DarkModeToggler from "./DarkModeToggler";
import { DocumentsContext } from "../context/DocumentsContext";
import DocumentTitle from "./DocumentTitle";
import { AppContext } from "../context/AppContext";
import { placeCaretAtEnd } from "../utils";

const ENTER_CHARCODE = 13;

export default function EditorPanel() {
  const [content, setContent] = useState("");
  const [lastSaved, setLastSaved] = useState("");
  const [tempDocument, setTempDocument] = useState({});
  const [wordCount, setWordCount] = useState(0);

  const { updateDocument, currentDocument, isLoading } =
    useContext(DocumentsContext);

  const { theme, changeTheme } = useContext(AppContext);

  const editorRef = useRef(null);
  const handleChange = () => {
    setContent(editorRef.current.innerHTML);
    setWordCount(
      (editorRef.current?.innerText &&
        editorRef.current?.innerText.trim().split(" ").length) ||
        0
    );
    updateDocument({
      id: tempDocument.id,
      content: editorRef.current.innerHTML,
    });
    console.log(editorRef.current.innerHTML);
  };

  const classes = classNames(
    "focus:outline-none dark:bg-gray-800 ",
    "h-full w-full flex flex-col bg-gray-200 font-bitter",
    "p-10 text-xl rounded-sm text-gray-900 dark:text-gray-100",
    "overflow-y-auto no-scrollbar",
    "transition-normal"
  );

  useEffect(() => {
    if (tempDocument.id != currentDocument.id) {
      setTempDocument(currentDocument);
      if (lastSaved != content)
        updateDocument({ id: tempDocument.id, content });
    }
  }, [currentDocument]);

  useEffect(() => {
    if (editorRef?.current) {
      editorRef.current.innerHTML = tempDocument.content || "";
      setContent(tempDocument.content);
      setLastSaved(tempDocument.content);
      placeCaretAtEnd(editorRef.current);
    }
  }, [tempDocument]);

  const toggleDarkMode = () => {
    changeTheme({ ...theme, dark: !theme.dark });
  };

  const handleTitleChange = (title) => {
    if (editorRef?.current) placeCaretAtEnd(editorRef.current);
    updateDocument({ id: tempDocument.id, title });
  };

  const incerptEnterPress = (e) => {
    // if (e.charCode === ENTER_CHARCODE) {
    //   e.preventDefault();
    //   if (window.getSelection) {
    //     const selection = window.getSelection(),
    //       range = selection.getRangeAt(0),
    //       br = document.createElement("br");
    //     range.deleteContents();
    //     range.insertNode(br);
    //     range.setStartAfter(br);
    //     range.setEndAfter(br);
    //     range.collapse(false);
    //     selection.removeAllRanges();
    //     selection.addRange(range);
    //   }
    // }
  };

  const forceLastChildBR = () => {
    // if (editorRef?.current) {
    //   if (
    //     !editorRef.current.lastChild ||
    //     editorRef.current.lastChild.nodeName.toLowerCase() != "br"
    //   ) {
    //     editorRef.current.appendChild(document.createElement("br"));
    //   }
    // }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="text-white animate-fade-in text-center w-1/2 mx-auto mb-3 h-0.5/12">
        <DocumentTitle
          title={tempDocument.title}
          onChange={handleTitleChange}
        />
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
          onKeyUp={forceLastChildBR}
          onMouseUp={forceLastChildBR}
          onKeyPress={incerptEnterPress}
        ></div>
        <DarkModeToggler
          onChange={toggleDarkMode}
          currentValue={theme && theme.dark}
          className="right-0 top-0 translate-x-1/2 -translate-y-1/2"
          isLoading={isLoading}
        />
        {
          <p className="absolute bottom-0 right-0 p-2 text-xs">
            {wordCount} word{wordCount === 1 ? "" : "s"}
          </p>
        }
      </div>
    </div>
  );
}

EditorPanel.defaultProps = {
  tempDocument: {},
  setDark: () => null,
};
