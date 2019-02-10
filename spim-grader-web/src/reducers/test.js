export default (
  state = {
    results: null,
    error: null,
  },
  action,
) => {
  switch (action.type) {
    case "TESTS_SUCCEEDED":
      return {
        ...state,
        error: null,
        loading: false,
        results: action.payload,
      }

    case "TESTS_FAILED":
      let error = action.payload.stderr || action.payload.error

      return {
        ...state,
        results: null,
        loading: false,
        error,
      }

    case "COMPILE":
      return {
        ...state,
        loading: true,
      }

    case "COMPILATION_FAILED":
      return {
        ...state,
        results: null,
        error: null,
      }

    default:
      return state
  }
}
