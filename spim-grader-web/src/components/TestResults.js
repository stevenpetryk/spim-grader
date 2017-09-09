import React from 'react'
import cx from 'classnames'

import sortBy from 'lodash/sortBy'

import './TestResults.css'

export default ({
  results
}) => (
  <ul className='inner test-results'>
    {sortBy(results.failures.concat(results.passes), 'id').map((test) => (
      <li className={cx({ failure: !test.ok })} key={test.id}>
        <p>{test.name.split(': ')[0]}</p>
        <p className='description'>{test.name.split(': ')[1]}</p>
      </li>
    ))}
  </ul>
)
