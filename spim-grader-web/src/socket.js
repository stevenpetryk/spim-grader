import store from './store'

const socket = new WebSocket('ws://localhost:4000')

socket.onmessage = (event) => {
  const message = JSON.parse(event.data)

  store.dispatch({ type: message.event.toUpperCase(), payload: message.payload })
}

socket.onclose = (event) => {
  store.dispatch({ type: 'SOCKET_CLOSED' })
}

export default socket

/* global WebSocket */
