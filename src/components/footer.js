import React from "react"
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'

export default function Footer(props) {
  return (<>
    <p id="copyright"><span>&copy;</span><span>&copy;</span><span>&copy;</span><span>&copy;</span><span>&copy;</span></p>
    <AudioPlayer
      className="audio-player"
      // autoPlay
      header = {props.musicTitle}
      src= {props.musicSrc}
      onPlay={e => console.log("onPlay")}
      // other props here
    />
  </>)
}