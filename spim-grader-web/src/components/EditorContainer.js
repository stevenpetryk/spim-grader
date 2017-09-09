import { connect } from 'react-redux'

import Editor from './Editor'

function mapStateToProps (state) {
  return { code: state.code }
}

function mapDispatchToProps (dispatch) {
  return {
    codeChanged (code) {
      dispatch({ type: 'CODE_CHANGED', payload: code })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor)
