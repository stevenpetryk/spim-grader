export default (state = {
  connected: false,
  containerId: null
}, action) => {
  switch (action.type) {
    case 'CONTAINER_STARTED':
      return {
        ...state,
        connected: true,
        containerId: action.payload.containerId
      }

    case 'SOCKET_CLOSED':
      return {
        ...state,
        connected: false,
        error: true
      }

    default:
      return state
  }
}
