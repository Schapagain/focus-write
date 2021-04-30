import classNames from "classnames";
import React, { useContext, useState } from "react";
import { AiOutlineRightCircle } from "react-icons/ai";
import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";

import { DocumentsContext } from "../context/DocumentsContext";
import IconButton from "./utils/IconButton";
import ListGridToggle from "./utils/ListGridToggle";

import RemoveModal from "./RemoveModal";
import DocumentsList from "./DocumentsList";
import DocumentsGrid from "./DocumentsGrid";

export default function Sidebar({}) {
  const [isOpen, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [view, setView] = useState("list");

  const { currentDocument, addDocument, removeDocument } = useContext(
    DocumentsContext
  );

  const classes = classNames(
    "p-3 h-full rounded-lg oveflow-hidden",
    "transition-width duration-500 ease",
    "flex flex-col",
    {
      "w-0": !isOpen,
      "w-64 ml-20": isOpen,
    }
  );

  return (
    <div className="flex h-screen-1/2 absolute bg-theme pr-2 rounded-r-lg transition-normal dark:bg-theme-dark left-0 top-1/4">
      <div className={classes}>
        <div className="h-2/12">
          <ListGridToggle currentView={view} setCurrentView={setView} />
        </div>
        <div className="h-10/12 p-3 w-full flex items-center justify-center">
          {view === "list" ? <DocumentsList /> : <DocumentsGrid />}
        </div>
      </div>
      <div className="flex w-12 flex-col justify-between items-center">
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
