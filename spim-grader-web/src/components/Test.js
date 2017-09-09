import React from 'react'

import Button from './Button'
import TestResults from './TestResults'

export default ({ results, test }) => (
  <div className='module test-status'>
    <Button onClick={test}>Test</Button>

    {results && <TestResults results={results} />}
  </div>
)
