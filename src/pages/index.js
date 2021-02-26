import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Head from '../components/head'

import styles from "./index.module.scss"

export default function Home({data}) {
  console.log({data})
  const dataRoot = "/data/"
  return (<Layout>
    <Head title="HOME" />
    <div className={styles.information}>
      <p>design changed @21.02.26</p>
    </div>
    <div className={styles.archives}>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <article className={styles.archive} key={node.id}>
          <Link
            to={node.fields.slug}
          >
            <figure>
              <img src={dataRoot+node.frontmatter.dataDirectry+"/1.jpg"} alt={node.frontmatter.title} />
            </figure>
            <h3>
              {node.frontmatter.title}{" "}
              <span>
                @{node.frontmatter.venue}
              </span>
              <span>
                @{node.frontmatter.date}
              </span>
            </h3>
            <p>{node.excerpt}</p>
          </Link>
        </article>
      ))}
    </div>
  </Layout>)
}

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "Do MMM, YYYY")
            venue
            dataDirectry
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`