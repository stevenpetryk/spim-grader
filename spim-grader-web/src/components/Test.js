import React from 'react'
import cx from 'classnames'

import TestResults from './TestResults'

export default ({
  loading,
  error,
  results
}) => {
  return (
    <div className={cx('test-status', { loading })}>
      {error && <p className='error'>{errorString(error)}</p>}
      {results && <TestResults results={results} />}
    </div>
  )
}

function errorString (error) {
  if (error === 'timeout') {
    return 'Your code took too long to run. Perhaps you have an infinite loop?'
  }

  return `Something went wrong: ${error}`
}
