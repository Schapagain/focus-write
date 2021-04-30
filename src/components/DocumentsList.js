import React, { useContext } from "react";
import { DocumentsContext } from "../context/DocumentsContext";

export default function DocumentsList() {
  const { documents, currentDocument, changeCurrentDocument } = useContext(
    DocumentsContext
  );

  return (
    <div className="h-full flex-col flex overflow-y-auto cursor-pointer no-scrollbar">
      {documents &&
        documents.map((document) => (
          <div
            key={document.id}
            className={`${
              currentDocument.id == document.id ? "bg-gray-200" : ""
            } py-1 pl-2 w-full animate-fade-in rounded-r-xl`}
            onClick={() => changeCurrentDocument(document)}
          >
            <p className="truncate">{document.title}</p>
          </div>
        ))}
    </div>
  );
}
