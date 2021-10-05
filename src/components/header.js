import React from "react"
import styles from "./header.module.scss"
//import { useStaticQuery, Link, graphql } from "gatsby"

export default function Header(props) {
  return (
    <header className={styles.global_header}>
      <div className={styles.logo}>
        <div>
          {/* <span>PA's</span> */}
          REC OUT
        </div>
      </div>
      {/* <div className={styles.nowPlaying}>♪ {props.nowPlaying}</div> */}
    </header>
  )
}