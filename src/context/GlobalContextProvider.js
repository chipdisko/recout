import React from "react"
import Header from "../components/header"
import Footer from "../components/footer"

export const GlobalStateContext = React.createContext()
export const GlobalDispatchContext = React.createContext()

const initialState = {
  musicUrl: "",
  musicTitle: "",
  playerStatus: "stop"
}


function reducer(state, action) {
  switch (action.type) {
    case "CHANGE_MUSIC": {
      return {
        ...state,
        musicUrl: state.musicUrl === action.url ? "" : action.url,
        musicTitle: state.musicUrl === action.url ? "" : action.title,
        playerStatus: "playing",
      }
    }
    case "PAUSE": {
      console.log('reducer: PAUSE')
      return {
        ...state,
        playerStatus: "paused"
      }
    }
    case "PLAY": {
      console.log('reducer: PLAY')
      return {
        ...state,
        playerStatus: "playing"
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
        <Footer playerStatus= {state.playerStatus} musicTitle = {state.musicTitle} musicSrc = {state.musicUrl} />
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  )
}

export default GlobalContextProvider