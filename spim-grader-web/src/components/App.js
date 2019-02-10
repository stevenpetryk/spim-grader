import React, { Component } from "react"

import "./App.css"

import SidebarContainer from "./SidebarContainer"
import EditorContainer from "./EditorContainer"

class App extends Component {
  constructor() {
    super()

    this.state = {
      code: localStorage.getItem("code") || require("../project.c"),
    }
  }

  updateCode(code) {
    localStorage.setItem("code", code)
    this.setState({ code })
  }

  render() {
    return (
      <div className="app">
        <EditorContainer />
        <SidebarContainer />
      </div>
    )
  }
}

export default App

/* global localStorage */
