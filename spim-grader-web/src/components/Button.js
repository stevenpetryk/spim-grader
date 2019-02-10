import React from "react"
import cx from "classnames"

import "./Button.scss"

export default ({ children, className, disabled, onClick = () => {}, ...rest }) => (
  <button
    className={cx("button", className, { disabled })}
    onClick={event => {
      event.preventDefault()

      if (disabled) return
      onClick(event)
    }}
  >
    {children}
  </button>
)
