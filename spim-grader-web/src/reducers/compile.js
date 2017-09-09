export default (state = {
  compiled: false,
  compiling: false,
  codeChangedSinceCompilation: true,
  error: null
}, action) => {
  switch (action.type) {
    case 'COMPILE':
      return {
        ...state,
        compiling: true,
        codeChangedSinceCompilation: false
      }
    case 'COMPILATION_SUCCEEDED':
      return {
        ...state,
        compiled: true,
        compiling: false,
        codeChangedSinceCompilation: false,
        error: null
      }

    case 'COMPILATION_FAILED':
      return {
        ...state,
        compiled: false,
        compiling: false,
        codeChangedSinceCompilation: false,
        error: action.payload.stderr
      }

    case 'CODE_CHANGED':
      return {
        ...state,
        codeChangedSinceCompilation: true
      }
  }

  return state
}
