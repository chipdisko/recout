import React from "react"
import Header from "../components/header"
import Footer from "../components/footer"

export const GlobalStateContext = React.createContext()
export const GlobalDispatchContext = React.createContext()

const initialState = {
  musicUrl: "",
  musicTitle: "",
}


function reducer(state, action) {
  switch (action.type) {
    case "CHANGE_MUSIC": {
      return {
        ...state,
        musicUrl: state.musicUrl === action.url ? "" : action.url,
        musicTitle: state.musicUrl === action.url ? "" : action.title,
      }
    }
    default:
      throw new Error("Bad Action Type")
  }
}

const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  return (
    <GlobalStateContext.Provider value={state}>
      <GlobalDispatchContext.Provider value={dispatch}>
        <Header nowPlaying = {state.musicTitle} />
        {children}
        <Footer musicTitle = {state.musicTitle} musicSrc = {state.musicUrl} />
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  )
}

export default GlobalContextProvider