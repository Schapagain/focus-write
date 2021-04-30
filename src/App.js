import React from "react";
import MainContainer from "./components/MainContainer";
import AppContextProvider from "./context/AppContext";

export default function App() {
  return (
    <AppContextProvider>
      <MainContainer />
    </AppContextProvider>
  );
}
