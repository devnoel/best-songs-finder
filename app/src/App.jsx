"use strict"

import { Component } from "react"
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/albums" render={ props =>
            <h1>Hello World!</h1>
          } />
          <Route path="/best" render={ props =>
            <h1>Best!</h1>
          } />
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
