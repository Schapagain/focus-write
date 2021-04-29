import React from "react";
import MainContainer from "./components/MainContainer";
import DocumentsContextProvider from "./context/DocumentsContext";

export default function App() {
  return (
    <DocumentsContextProvider>
      <MainContainer />
    </DocumentsContextProvider>
  );
}
