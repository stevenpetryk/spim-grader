import { default as localStore } from "store"
import pick from "lodash/pick"

export default (...keys) => {
  return store => next => action => {
    const prevState = store.getState()
    const result = next(action)
    const nextState = store.getState()

    if (prevState !== nextState) {
      localStore.set("state", pick(nextState, keys))
    }

    return result
  }
}
