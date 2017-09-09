export default (state = require('../project.c'), action) => {
  switch (action.type) {
    case 'CODE_CHANGED':
      return action.payload
    default:
      return state
  }
}
