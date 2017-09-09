import socket from '../socket'

export default store => next => action => {
  if (!action) return

  if (action.socket) {
    socket.send(JSON.stringify({
      command: action.type.toLowerCase(),
      ...action.payload
    }))
  }

  return next(action)
}
