import { combineReducers } from 'redux'

import code from './code'
import compile from './compile'
import connection from './connection'
import test from './test'

export default combineReducers({
  code,
  compile,
  connection,
  test
})
