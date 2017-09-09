import React from 'react'

import CodeMirror from 'react-codemirror'
import '../../node_modules/codemirror/lib/codemirror.css'
import 'codemirror/mode/clike/clike'

export default ({
  code,
  codeChanged
}) => (
  <div className='editor'>
    <CodeMirror
      value={code}
      onChange={codeChanged}
      options={{
        mode: 'text/x-csrc',
        lineNumbers: true,
        tabSize: 2
      }}
    />
  </div>
)
