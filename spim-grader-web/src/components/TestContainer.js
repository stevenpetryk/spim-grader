import { connect } from 'react-redux'
import Test from './Test'

function mapStateToProps (state) {
  return state.test
}

function mapDispatchToProps (dispatch) {
  return {
    test () {
      dispatch({ type: 'TEST', socket: true })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Test)
