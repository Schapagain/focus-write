import React, { useContext } from "react";
import { DocumentsContext } from "../context/DocumentsContext";

const Card = ({ title, content, active, ...rest }) => (
  <div
    className={`h-40 animate-fade-in text-xs w-32 ${
      active ? "border-4 border-white" : "border border-gray-400"
    } p-3`}
    {...rest}
  >
    <p className="h-3/12 text-sm truncate text-center">{title}</p>
    <p className="h-9/12 overlow-ellipses overflow-hidden break-words w-full">
      {content}
    </p>
  </div>
);

export default function DocumentsGrid() {
  const { documents, currentDocument, changeCurrentDocument } = useContext(
    DocumentsContext
  );
  return (
    <div className="h-full flex-col gap-3 flex overflow-y-auto cursor-pointer no-scrollbar">
      {documents &&
        documents.map((document) => (
          <Card
            onClick={() => changeCurrentDocument(document)}
            active={document.id === currentDocument.id}
            key={document.id}
            title={document.title}
            content={document.content}
          />
        ))}
    </div>
  );
}
