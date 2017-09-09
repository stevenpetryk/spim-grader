export default (state = {
  tested: false,
  results: null,
  error: null
}, action) => {
  switch (action.type) {
    case 'TESTS_SUCCEEDED':
      return {
        ...state,
        results: action.payload
      }

    case 'COMPILATION_SUCCEEDED':
    case 'COMPILATION_FAILED':
      return {
        ...state,
        results: null,
        error: null
      }
  }

  return state
}
