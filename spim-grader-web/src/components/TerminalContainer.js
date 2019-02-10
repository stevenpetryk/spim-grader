import { connect } from "react-redux"

import RunTerminal from "./RunTerminal"

function mapStateToProps() {
  return {}
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    sendStdin(line) {
      // dispatch({ type: 'STDIN', socket: true, payload: { line } })
    },
  }
}

export default connect()(RunTerminal)
