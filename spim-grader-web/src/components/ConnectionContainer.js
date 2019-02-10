import { connect } from "react-redux"
import Connection from "./Connection"

function mapStateToProps(state) {
  return state.connection
}

export default connect(mapStateToProps)(Connection)
