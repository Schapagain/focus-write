import classNames from "classnames";
import React, { useContext, useState } from "react";
import { DocumentsContext } from "../context/DocumentsContext";
import { AiOutlineRightCircle } from "react-icons/ai";

export default function Sidebar({}) {
  const [isOpen, setOpen] = useState(false);

  const { documents, currentDocument, changeCurrentDocument } = useContext(
    DocumentsContext
  );

  const classes = classNames(
    "absolute left-0 top-1/4 bg-theme dark:bg-theme-dark",
    "h-52 p-3 rounded-lg oveflow-hidden",
    "transition-width duration-500 ease pr-10",
    {
      "w-0": !isOpen,
      "w-48": isOpen,
    }
  );

  return (
    <div className={classes}>
      <div className="relative">
        <ul
          className="h-full overflow-y-auto cursor-pointer no-scrollbar"
          role="tablist"
        >
          {documents &&
            Object.keys(documents).map((id) => (
              <li
                role="tab"
                key={id}
                className={`${
                  currentDocument.id == id ? "bg-gray-200" : ""
                } py-1 pl-2 rounded-r-xl`}
                onClick={() => changeCurrentDocument(documents[id])}
              >
                {documents[id].title}
              </li>
            ))}
        </ul>
        <AiOutlineRightCircle
          onClick={() => setOpen(!isOpen)}
          className={`text-4xl cursor-pointer text-white absolute -right-10 top-1/2 -translate-y-1/2 transition-normal transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>
    </div>
  );
}
