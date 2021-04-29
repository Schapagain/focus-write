import React, { createContext, useState, useEffect } from "react";
import { getFromLocalStorage, saveToLocalStorage } from "../utils";
import { v4 as uuid } from "uuid";

export const DocumentsContext = createContext();

/*
document schema:

id: String
title : String
content : String
dateCreate: DateString
lastSaved: DateString

*/

export default function DocumentsContextProvider({ children }) {
  const [documents, setDocuments] = useState(null);
  const [isLoading, setLoading] = useState(0);
  const [currentDocument, setCurrentDocument] = useState({});

  useEffect(() => {
    let savedDocuments = getFromLocalStorage("documents");
    if (!savedDocuments) {
      addDocument();
    } else {
      setDocuments(savedDocuments);
    }
  }, []);

  const addDocument = () => {
    const newDocument = {
      id: uuid(),
      title: `Cool New Idea #${
        ((documents && Object.keys(documents).length) || 0) + 1
      }`,
      content: "",
      dateCreate: new Date(),
    };
    setDocuments((documents) => ({
      ...documents,
      [newDocument.id]: newDocument,
    }));
    setCurrentDocument(newDocument);
  };

  const removeDocument = (id) => {
    setDocuments((documents) => {
      delete documents[id];
      return { ...documents };
    });
  };

  const updateDocument = (id, content) => {
    setDocuments((documents) => ({
      ...documents,
      [id]: { ...documents[id], content, lastSaved: new Date() },
    }));
  };

  useEffect(() => {
    if (documents) {
      saveDocuments();
      if (!currentDocument.id) setCurrentDocument(Object.values(documents)[0]);
    }
  }, [documents]);

  const saveDocuments = () => {
    setLoading((loading) => loading + 1);
    saveToLocalStorage({
      documents,
      dateSaved: new Date(),
      count: Object.keys(documents).length,
    });
    setTimeout(() => {
      setLoading((loading) => loading - 1);
    }, 1500);
  };

  const changeCurrentDocument = (newCurrent) => {
    setCurrentDocument(newCurrent);
  };

  return (
    <DocumentsContext.Provider
      value={{
        documents,
        isLoading,
        currentDocument,
        changeCurrentDocument,
        addDocument,
        removeDocument,
        updateDocument,
        saveDocuments,
      }}
    >
      {children}
    </DocumentsContext.Provider>
  );
}
