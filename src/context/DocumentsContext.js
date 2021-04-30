import React, { createContext, useState, useEffect, useCallback } from "react";
import {
  getFromLocalStorage,
  getRandomAdjective,
  getRandomNoun,
  saveToLocalStorage,
} from "../utils";
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
  const [documents, setDocuments] = useState([]);
  const [isLoading, setLoading] = useState(0);
  const [currentDocument, setCurrentDocument] = useState({});

  useEffect(() => {
    let savedDocuments = getFromLocalStorage("documents");
    let savedCurrent = getFromLocalStorage("currentDocument");
    if (!Array.isArray(savedDocuments)) {
      localStorage.clear();
      savedDocuments = null;
    }
    if (!savedDocuments) {
      addDocument();
    } else {
      setDocuments(savedDocuments);
    }
    if (savedCurrent) {
      setCurrentDocument(savedCurrent);
    }
  }, []);

  const addDocument = useCallback(() => {
    const newDocument = {
      id: uuid(),
      title: `${getRandomAdjective()} ${getRandomAdjective()} ${getRandomNoun()}`,
      content: "",
      dateCreate: new Date(),
    };
    setDocuments((documents) => [...documents, newDocument]);
    setCurrentDocument(newDocument);
  });

  const removeDocument = useCallback((id) => {
    const index = documents.findIndex((document) => document.id == id);
    if (index > -1) {
      if (documents.length === 1) {
        addDocument();
      } else if (index == documents.length - 1) {
        setCurrentDocument(documents[documents.length - 2]);
      } else {
        setCurrentDocument(documents[index + 1]);
      }
      setDocuments((documents) =>
        documents.filter((document) => document.id != id)
      );
    }
  });

  const updateDocument = useCallback((document) => {
    if (!document || !document.id) return;
    const index = documents.findIndex((d) => d.id == document.id);
    if (index > -1) {
      setDocuments((documents) => [
        ...documents.slice(0, index),
        { ...documents[index], ...document, lastSaved: new Date() },
        ...documents.slice(index + 1),
      ]);
      if (document.id === currentDocument.id)
        setCurrentDocument((currentDocument) => ({
          ...currentDocument,
          ...document,
        }));
    }
  });

  useEffect(() => {
    if (documents && documents.length) {
      saveDocuments();
      if (!currentDocument.id) setCurrentDocument(documents[0]);
    }
  }, [documents]);

  useEffect(() => {
    if (currentDocument) {
      saveToLocalStorage({ currentDocument });
    }
  }, [currentDocument]);

  const saveDocuments = useCallback(() => {
    setLoading((loading) => loading + 1);
    saveToLocalStorage({
      documents,
      dateSaved: new Date(),
      count: documents.length,
    });
    setTimeout(() => {
      setLoading((loading) => loading - 1);
    }, 1500);
  });

  const changeCurrentDocument = useCallback((newCurrent) => {
    setCurrentDocument(newCurrent);
  });

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
