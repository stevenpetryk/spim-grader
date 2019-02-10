import React, { Component } from "react"
import { connect } from "react-redux"
import cx from "classnames"

class TestBadge extends Component {
  render() {
    const { loading, error, results } = this.props

    return <div className={cx("badge", { loading, error: error || (results && results.fail) })} />
  }
}

export default connect(state => state.test)(TestBadge)
