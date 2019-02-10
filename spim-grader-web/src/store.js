import { createStore, applyMiddleware } from "redux"

import reducers from "./reducers"
import { composeWithDevTools } from "redux-devtools-extension"

import thunk from "redux-thunk"
import socketMiddleware from "./middlewares/socketMiddleware"
import freezeMiddleware from "./middlewares/freezeMiddleware"

import { default as localStore } from "store"

export default createStore(
  reducers,
  localStore.get("state"),
  composeWithDevTools(applyMiddleware(thunk, socketMiddleware, freezeMiddleware("code"))),
)
