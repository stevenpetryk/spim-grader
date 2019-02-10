import React from "react"
import { render } from "react-dom"
import { AppContainer as HotEnabler } from "react-hot-loader"
import App from "./components/App"
import "normalize.css"

import { Provider } from "react-redux"

import store from "./store"

import "./socket"

const appRoot = document.getElementById("root")

render(
  <HotEnabler>
    <Provider store={store}>
      <App />
    </Provider>
  </HotEnabler>,
  appRoot,
)

if (module.hot) {
  module.hot.accept("./components/App", () => {
    const NextApp = require("./components/App").default

    render(
      <HotEnabler>
        <Provider store={store}>
          <NextApp />
        </Provider>
      </HotEnabler>,
      appRoot,
    )
  })
}
