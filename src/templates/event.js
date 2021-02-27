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
  const dataRoot = "/data/"

  const [isLight, setIsLight] = useState(false);
  const toggleLight = () => {
    setIsLight(!isLight);
  }

  // REDUX ACTION
  const changeMusic = (url, title) => {
    return {
        type: "CHANGE_MUSIC",
        url: dataRoot+url,
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
    <Head title={post.frontmatter.title+"@"+post.frontmatter.venue+"@"+post.frontmatter.date}
    />
    <article>
      <h1 className={styles.eventTitle}>
        {post.frontmatter.title} 
        <span className={styles.meta}>@<span className={styles.venue}>{post.frontmatter.venue}</span>@<span className={styles.date}>{post.frontmatter.date}</span></span>
      </h1>
      <div className={styles.eventData}>
        <div className={styles.nontext}>
          <figure className={isLight ? styles.light:''} onClick={toggleLight}>
            <img src={dataRoot+data.images.nodes[0].relativePath} alt={post.frontmatter.title} />
          </figure>
          <ol>
            <p>▽ CLICK <FontAwesomeIcon icon={faPlay} /> to play, <FontAwesomeIcon icon={faFileDownload} /> to DOWNLOAD.</p>
            {data.audios.nodes.map((node) => {
              const prettyName = node.name.replace(/@.*/,"").replace(/\d+-/,"")
              const tag = prettyName.replace(/-.*/,"")
              const name = prettyName.replace(/.*?-/,"").replace(/_/g," ")

              return <li key={node.id}>
                <button 
                  className={
                    "audio-play "
                    +(state.musicTitle === node.name? styles.current: "" )
                } 
                  onClick={ (e)=> {
                    dispatch(handlePlayButton(node.relativePath, node.name))
                  }
                }>
                  <div className={styles.icon}>
                    {
                      state.playerStatus === "playing"&&state.musicTitle === node.name ? <FontAwesomeIcon icon={faPause} />:<FontAwesomeIcon icon={faPlay} />
                    }
                  </div>
                  <span className={styles.name}>
                    <span className={`${styles.tag}  ${styles[tag]}`}>{tag}</span>{name}
                  </span>
                </button> 
                <a href={dataRoot+node.relativePath} download><FontAwesomeIcon icon={faFileDownload} /></a>
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
          // <Link key={node.id} to={dataRoot+node.relativePath}><img src={dataRoot+node.relativePath} alt={node.name} /></Link>
          <img key={node.id} src={dataRoot+node.relativePath} alt={node.name} />
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
    audios: allFile(
      filter: {sourceInstanceName: {eq: "data"}, relativeDirectory: {in: $dataDirectry}, extension: {eq: "mp3"}},
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