import store from "./store"

const protocol = window.location.protocol === "https:" ? "wss:" : "ws:"
const socket = new WebSocket(`${protocol}//${window.location.host}/ws`)

socket.onmessage = event => {
  const message = JSON.parse(event.data)

  store.dispatch({ type: message.event.toUpperCase(), payload: message.payload })
}

socket.onclose = event => {
  store.dispatch({ type: "SOCKET_CLOSED" })
}

export default socket

/* global WebSocket */
