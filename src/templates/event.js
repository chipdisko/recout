import React , {useContext, useState} from "react"
import {graphql} from "gatsby"
// import classNames from 'classnames';
import Layout from "../components/layout"
import Head from '../components/head'
import styles from "./event.module.scss"

import {
  GlobalDispatchContext,
  GlobalStateContext,
} from "../context/GlobalContextProvider"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause,faFileDownload } from "@fortawesome/free-solid-svg-icons"

export default function Events({data, pageContext}) {
  const post = data.markdownRemark
  const dispatch = useContext(GlobalDispatchContext)
  const state = useContext(GlobalStateContext)
  const dataRootPath = "/data/"
  const audiosRootPath = "/audios/"

  const [isLight, setIsLight] = useState(false);
  const toggleLight = () => {
    setIsLight(!isLight);
  }

  // REDUX ACTION
  const changeMusic = (url, title) => {
    return {
        type: "CHANGE_MUSIC",
        url: url,
        title: title,
    }
  }
  const pauseMusic = () => {
    return {
        type: "PAUSE",
    }  
  }
  const playMusic = () => {
    return {
        type: "PLAY",
    }  
  }
  const handlePlayButton = (url, title) => {
    if(state.musicTitle === title){
      switch(state.playerStatus) {
        case "paused":
          return playMusic()
        case "playing":
          return pauseMusic()
      }
    } else {
      return changeMusic(url, title);
    }
  }

  return (<Layout>
    <Head title={post.frontmatter.title+"@"+post.frontmatter.venue+"@"+post.frontmatter.date} />
    <article>
      <div className={styles.eventTitle}>
        <h1>
          {post.frontmatter.title} 
          <span className={styles.meta}>@<span className={styles.venue}>{post.frontmatter.venue}</span>@<span className={styles.date}>{post.frontmatter.date}</span></span>
        </h1>
      </div>
      <div className={styles.eventData}>
        <div className={styles.nontext}>
          <figure className={isLight ? styles.light:''} onClick={toggleLight}>
            <img src={dataRootPath+data.images.nodes[0].relativePath} alt={post.frontmatter.title} />
          </figure>
          <ol>
            <p>▽ CLICK <FontAwesomeIcon icon={faPlay} /> to play, <FontAwesomeIcon icon={faFileDownload} /> to DOWNLOAD.</p>

            {post.frontmatter.tracklist.map((track) => {
              const prettyName = track.replace(/@.*/,"").replace(/\d+-/,"")
              const tag = prettyName.replace(/-.*/,"")
              const name = prettyName.replace(/.*?-/,"").replace(/_/g," ")
              const trackUrl = audiosRootPath+post.frontmatter.dataDirectry+"/"+track

              return <li key={track}>
                <button 
                  className={
                    "audio-play "
                    +(state.musicTitle === track? styles.current: "" )
                } 
                  onClick={ (e)=> {
                    dispatch(handlePlayButton(trackUrl, track))
                  }
                }>
                  <div className={styles.icon}>
                    {
                      state.playerStatus === "playing"&&state.musicTitle === track ? <FontAwesomeIcon icon={faPause} />:<FontAwesomeIcon icon={faPlay} />
                    }
                  </div>
                  <span className={styles.name}>
                    <span className={`${styles.tag}  ${styles[tag]}`}>{tag}</span>{name}
                  </span>
                </button> 
                <a href={trackUrl} download><FontAwesomeIcon icon={faFileDownload} /></a>
              </li>
            })}
          </ol>
        </div>
        <div className={styles.text}>
          <div className={styles.description} dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
      </div>
      <figure className={styles.gallery}>
        {data.images.nodes.map((node) => (
          // <Link key={node.id} to={dataRootPath+node.relativePath}><img src={dataRootPath+node.relativePath} alt={node.name} /></Link>
          <img key={node.id} src={dataRootPath+node.relativePath} alt={node.name} />
        ))}
      </figure>
    </article>
  </Layout>)
}

export const query = graphql`
  query($slug: String!, $dataDirectry: [String]) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date
        venue
        dataDirectry
        tracklist
      }
    }
    images: allFile(
      filter: {sourceInstanceName: {eq: "data"}, relativeDirectory: {in: $dataDirectry}, extension: {in: ["jpg","png"]}},
      sort: {fields: name, order: ASC}
    ){
      nodes {
        id
        prettySize
        name
        relativePath
      }
    }
  }
`
/*
nodes {
  id
  publicURL
  prettySize
  name
  relativePath
}
*/