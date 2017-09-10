import React from 'react'
import cx from 'classnames'

import './Compile.css'

import Button from './Button'

export default ({
  compiled,
  compiling,
  codeChangedSinceCompilation,
  error,
  compile
}) => (
  <div className={cx('module compilation-status', { compiled, compiling, error })}>
    <Button disabled={!codeChangedSinceCompilation} onClick={compile}>Compile</Button>

    <div className='inner'>
      {getCompileStatus({ compiled, compiling, codeChangedSinceCompilation, error })}

      {error && <pre>{error}</pre>}
    </div>
  </div>
)

function getCompileStatus ({ compiled, compiling, codeChangedSinceCompilation, error }) {
  if (compiling) {
    return <p><img alt='' src={require('../images/circle-o-amber.svg')} /> Compiling...</p>
  }

  if (error) {
    if (codeChangedSinceCompilation) {
      return <p><img alt='' src={require('../images/circle-o-amber.svg')} /> Code changed since last compilation</p>
    } else {
      return <p><img alt='' src={require('../images/error.svg')} /> Compilation failed</p>
    }
  }

  if (compiled) {
    if (codeChangedSinceCompilation) {
      return <p><img alt='' src={require('../images/circle-o-amber.svg')} /> Code changed since last compilation</p>
    } else {
      return <p><img alt='' src={require('../images/check.svg')} /> Compilation successful, no changes</p>
    }
  }

  return <p><img alt='' src={require('../images/circle-o.svg')} /> Changes have not been compiled</p>
}
