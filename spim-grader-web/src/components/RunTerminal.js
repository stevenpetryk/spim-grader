import React, { Component } from "react"

import "./RunTerminal.css"
import "./attach"

import socket from "../socket"

export default class RunTerminal extends Component {
  componentDidMount() {
    const xterm = new Terminal({
      cursorBlink: true,
      cols: 40,
    })

    xterm.open(this.root)
    xterm.attach(socket)
  }

  render() {
    return <div ref={ref => (this.root = ref)} />
  }
}
