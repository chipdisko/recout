import React, {useState, useRef, useEffect, useContext} from "react"
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'

import {
  GlobalDispatchContext,
} from "../context/GlobalContextProvider"

export default function Footer(props) {
  const dispatch = useContext(GlobalDispatchContext)

  const [playerStatus, setPlayerStatus] = useState(props.playerStatus);
  const player = useRef();

  const setMusicPause = () => {
    player.current.audio.current.pause();
    dispatch({
      type: "PAUSE",
    })
  }
  const setMusicPlay = () => {
    player.current.audio.current.play();
    dispatch({
      type: "PLAY",
    })
  }
  const onPlaying = () => {
    setMusicPlay();
  }
  const onPause = () => {
    setMusicPause();
  }

  function Lifecycle() {
    // Pass useEffect a function
    useEffect(() => {
      if(props.playerStatus !== playerStatus) {
        switch(props.playerStatus) {
          case "paused" :
            setMusicPause()
            break;
          case "playing" :
            setMusicPlay()
            break;
        }
        setPlayerStatus(props.playerStatus);
      }
      return;
    })
  
    return "";
  }

  return (<>
    <AudioPlayer
      ref = {player}
      className={"audio-player " + props.playerStatus}
      // autoPlay
      header = {props.musicTitle}
      src= {props.musicSrc}
      onPlay={onPlaying}
      onPause={onPause}
      // other props here
    />
    <Lifecycle />
  </>)
}