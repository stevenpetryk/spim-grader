import React, { Component } from "react"
import cx from "classnames"

import "./Sidebar.css"
import "./Tabs.css"

import ConnectionContainer from "./ConnectionContainer"
import CompileContainer from "./CompileContainer"

import { Tab, Tabs, TabList, TabPanel } from "react-tabs"

import TerminalContainer from "./TerminalContainer"

import TestBadge from "./TestBadge"
import TestContainer from "./TestContainer"

export default class Sidebar extends Component {
  render() {
    return (
      <div
        className={cx("sidebar", {
          compiled: this.props.compiled,
          connected: this.props.connected,
        })}
      >
        <ConnectionContainer />

        <CompileContainer />

        <Tabs>
          <TabList>
            <Tab>Run</Tab>
            <Tab>
              Tests <TestBadge />
            </Tab>
          </TabList>

          <div className="react-tab-panels">
            <TabPanel>
              <TerminalContainer />
            </TabPanel>

            <TabPanel>
              <TestContainer />
            </TabPanel>
          </div>
        </Tabs>
      </div>
    )
  }
}
