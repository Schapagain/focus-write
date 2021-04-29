import classNames from "classnames";
import React, { useContext, useState } from "react";
import { AiOutlineRightCircle } from "react-icons/ai";
import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";

import { DocumentsContext } from "../context/DocumentsContext";
import IconButton from "./utils/IconButton";
import RemoveModal from "./RemoveModal";

export default function Sidebar({}) {
  const [isOpen, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const {
    documents,
    currentDocument,
    changeCurrentDocument,
    addDocument,
    removeDocument,
  } = useContext(DocumentsContext);

  const classes = classNames(
    "h-60 p-3 rounded-lg oveflow-hidden",
    "transition-width duration-500 ease",
    "flex flex-col",
    {
      "w-0": !isOpen,
      "w-48": isOpen,
    }
  );

  return (
    <div className="flex absolute bg-theme pr-2 rounded-r-lg transition-normal dark:bg-theme-dark left-0 top-1/4">
      <div className={classes}>
        <ul
          className="h-full overflow-y-auto cursor-pointer no-scrollbar"
          role="tablist"
        >
          {documents &&
            documents.map((document) => (
              <li
                role="tab"
                key={document.id}
                className={`${
                  currentDocument.id == document.id ? "bg-gray-200" : ""
                } py-1 pl-2 truncate animate-fade-in rounded-r-xl`}
                onClick={() => changeCurrentDocument(document)}
              >
                {document.title}
              </li>
            ))}
        </ul>
      </div>
      <div className="flex flex-col justify-between items-center">
        <IconButton onClick={addDocument}>
          <MdAddCircleOutline
            className={`text-theme-dark transition-normal transform text-xl dark:text-white ${
              isOpen ? " rotate-360 " : ""
            }`}
          />
        </IconButton>
        <AiOutlineRightCircle
          onClick={() => setOpen(!isOpen)}
          className={`text-4xl cursor-pointer text-white transform transition-normal ${
            isOpen
              ? " hover:-translate-x-1 rotate-180 "
              : " hover:translate-x-1 "
          }`}
        />
        <IconButton>
          <MdRemoveCircleOutline
            onClick={() => setShowModal(true)}
            className={`text-theme-dark transition-normal transform text-xl dark:text-white ${
              isOpen ? " rotate-360 " : ""
            }`}
          />
        </IconButton>
      </div>
      {showModal && (
        <RemoveModal
          onDelete={() => {
            removeDocument(currentDocument.id);
            setShowModal(false);
          }}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
