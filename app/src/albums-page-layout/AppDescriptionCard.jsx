"use strict"

import React, { Component } from "react"
import Card from "../common-layout/Card"

class AppDescriptionCard extends Component {
  render() {
    return (
      <Card classNamw="apl-notification-card">
        <h1>"Legjobb dalok" kereső</h1>
        <p>Ez az alkalmazás a kliens oldala <a href="https://gszabo.github.io/elte-korszeru-web/homework/2017-2/index.html">ennek a feladatnak</a>.</p>
        <p>Telepítés és szerver indítása:</p>
        <ol>
          <li>git clone https://github.com/devnoel/best-songs-finder</li>
          <li>npm init</li>
          <li>npm install</li>
          <li>npm run build</li>
          <li>npm start</li>
        </ol>
      </Card>
    )
  }
}

export default AppDescriptionCard