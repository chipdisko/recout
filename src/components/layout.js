import React from "react"
import "fontsource-didact-gothic"
import "fontsource-monoton"
import "../styles/global.scss"

export default function Layout({children}) {

  return <main role="main">
    {children}
    </main>
  }