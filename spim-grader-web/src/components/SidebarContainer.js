import { connect } from "react-redux"
import Sidebar from "./Sidebar"

function mapStateToProps(state) {
  return {
    connected: state.connection.connected,
    compiled: state.compile.compiled,
  }
}

export default connect(mapStateToProps)(Sidebar)
