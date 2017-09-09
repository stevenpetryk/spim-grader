import { connect } from 'react-redux'
import Compile from './Compile'

function mapStateToProps (state) {
  return state.compile
}

function mapDispatchToProps (dispatch) {
  return {
    compile () {
      dispatch((dispatch, getState) => dispatch({ type: 'COMPILE', socket: true, payload: { program: getState().code } }))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Compile)
