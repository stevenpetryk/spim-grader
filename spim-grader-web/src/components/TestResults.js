import React from "react"
import cx from "classnames"

import sortBy from "lodash/sortBy"

import "./TestResults.css"

export default ({ results }) => (
  <div className="test-results">
    <p className="summary">
      {results.pass} passed, {results.fail} failed
    </p>

    <ul>
      {sortBy(results.failures.concat(results.passes), "id").map(test => (
        <li className={cx({ failure: !test.ok })} key={test.id}>
          <p>
            {test.name.split(": ")[0]}{" "}
            <span className="description">{test.name.split(": ")[1]}</span>
          </p>
        </li>
      ))}
    </ul>
  </div>
)
