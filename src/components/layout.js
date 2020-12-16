import React from "react"

import "../styles/global.scss"

export default function Layout({children}) {

  return <main role="main">
    {children}
    </main>
  }