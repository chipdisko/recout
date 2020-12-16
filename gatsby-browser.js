import React from "react"
import GlobalContextProvider from "./src/context/GlobalContextProvider.js"

export const wrapRootElement = ({ element }) => {
  return <GlobalContextProvider>{element}</GlobalContextProvider>
}