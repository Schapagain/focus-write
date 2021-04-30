import React, { createContext, useState, useEffect, useCallback } from "react";
import { getFromLocalStorage, saveToLocalStorage } from "../utils";

/*
keys handled: 
theme : {id,name,dark}
page,


*/

const DEFAULT_THEME = { id: 1, name: "default", dark: false };

export const AppContext = createContext();

export default function AppContextProvider({ children }) {
  const [theme, setTheme] = useState({});
  const [page, setPage] = useState("home");

  useEffect(() => {
    let theme = getFromLocalStorage("theme");
    theme ? setTheme(theme) : setTheme(DEFAULT_THEME);
  }, []);

  const changeTheme = useCallback((theme) => {
    setTheme(theme);
    saveToLocalStorage({ theme });
  });

  const changePage = useCallback((page) => {
    setPage(page);
    saveToLocalStorage({ page });
  });

  return (
    <AppContext.Provider
      value={{
        theme,
        page,
        changePage,
        changeTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
