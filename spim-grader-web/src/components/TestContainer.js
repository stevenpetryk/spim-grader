import { connect } from 'react-redux'
import Test from './Test'

function mapStateToProps (state) {
  return state.test
}

export default connect(mapStateToProps)(Test)
