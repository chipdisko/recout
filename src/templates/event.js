import React , {useContext} from "react"
import {graphql} from "gatsby"
import Layout from "../components/layout"
import Head from '../components/head'
import styles from "./event.module.scss"
import {trackCustomEvent} from 'gatsby-plugin-google-analytics'

import {
  GlobalDispatchContext,
  GlobalStateContext,
} from "../context/GlobalContextProvider"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlay, faPause,faFileDownload } from "@fortawesome/free-solid-svg-icons"

export default function Events({data, pageContext}) {
  const post = data.markdownRemark
  const dispatch = useContext(GlobalDispatchContext)
  const state = useContext(GlobalStateContext)
  const dataRoot = "/data/"
  // REDUX ACTION
  const changeMusic = (url, title) => {
    return {
        type: "CHANGE_MUSIC",
        url: dataRoot+url,
        title: title,
    }
  }

  return (<Layout>
    <Head title={post.frontmatter.title+"@"+post.frontmatter.venue+"@"+post.frontmatter.date}
    />
    <article>
      <h1>{post.frontmatter.title} <span>@{post.frontmatter.venue}@{post.frontmatter.date}</span></h1>
      <div className={styles.event}>
        <div className={styles.sounds}>
          <figure>
            <img src={dataRoot+post.frontmatter.dataDirectry+"/1.jpg"} alt={post.frontmatter.title} />
          </figure>
          <p>▽ CLICK <FontAwesomeIcon icon={faPlay} /> to play, <FontAwesomeIcon icon={faFileDownload} /> to DOWNLOAD.</p>
          <ol>
            {data.audios.nodes.map((node) => {
              const prettyName = node.name.replace(/@.*/,"").replace(/\d+-/,"")
              const tag = prettyName.replace(/-.*/,"")
              const name = prettyName.replace(/.*?-/,"").replace(/_/g," ")

              return <li key={node.id}>
                <button 
                  className={"audio-play "+(state.musicTitle === node.name? styles.playing: "" )} 
                  onClick={ (e)=> {
                    // Lets track that custom click 
                    trackCustomEvent({
                      // string - required - The object that was interacted with (e.g.video) 
                      category: "Music Button",
                      // string - required - Type of interaction (e.g. 'play')
                      action: "Play Music",
                      // string - optional - Useful for categorizing events (e.g. 'Spring Campaign')
                      label: "played music",
                      // number - optional - Numeric value associated with the event. (e.g. A product ID)
                      value: node.name
                    })
                    dispatch(changeMusic(node.relativePath, node.name))
                  }
                }>
                  {
                    state.musicTitle === node.name ? <FontAwesomeIcon icon={faPause} />:<FontAwesomeIcon icon={faPlay} />
                  }
                </button> 
                <span className={styles.name}>
                  <span onClick={()=>dispatch(changeMusic(node.relativePath, node.name))}>
                    <span className={`${styles.tag}  ${styles[tag]}`}>{tag}</span>{name}
                  </span>
                  <a href={dataRoot+node.relativePath} download><FontAwesomeIcon icon={faFileDownload} /></a>
                </span>
              </li>
            })}
          </ol>
        </div>
        <div className={styles.information}>
          <div className={styles.description} dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
      </div>
      <figure className={styles.gallery}>
        {data.images.nodes.map((node) => (
          // <Link key={node.id} to={dataRoot+node.relativePath}><img src={dataRoot+node.relativePath} alt={node.name} /></Link>
          <img src={dataRoot+node.relativePath} alt={node.name} />
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
      filter: {sourceInstanceName: {eq: "data"}, relativeDirectory: {in: $dataDirectry}, extension: {eq: "jpg"}},
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