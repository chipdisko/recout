import React from 'react'
import Helmet from "react-helmet"
 
export default (props) => (
  <Helmet
    htmlAttributes={{
      lang: 'ja',
    }}
    title={ (props.title ? props.title + ' | ' : '') + "REC OUT"  }
    meta={[
      {
        name: 'description',
        content: props.description || "Proper DJ's REC OUTs."
      }
    ]}   
  />
)