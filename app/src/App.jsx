"use strict"

import React, { Component } from "react"
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"
import AlbumsPage from "./pages/AlbumsPage";
import BestSongsPage from "./pages/BestSongsPage";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/albums" component={AlbumsPage} />
          <Route path="/albums/:id/best" component={BestSongsPage} />
          <Redirect exact from="/" to="/albums"/>
          <Route render={ props =>
            <h1>Not Found!</h1>
          } />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
