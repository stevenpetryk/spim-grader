import React, { Component } from "react"
import cx from "classnames"

import "./Connection.css"

export default class Connection extends Component {
  getConnectionDetails() {
    if (this.props.connected) {
      return (
        <p>
          <code>Connected to {this.props.containerId}</code>
        </p>
      )
    } else {
      return (
        <p>
          <code>Connecting to compiler...</code>
        </p>
      )
    }
  }

  render() {
    return (
      <div className={cx("connection", { connected: this.props.connected })}>
        {this.getConnectionDetails()}
      </div>
    )
  }
}
