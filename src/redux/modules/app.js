
// 错误状态是基础的全局状态，因此定义到app.js文件中

const initialState = {
  error: null
}

// define action types
export const types = {
  CLEAR_ERROR: 'APP/CLEAR_ERROR'
}

// define action creator
export const actions = {
  clearError: () => ({
    type: types.CLEAR_ERROR
  })
}

const reducer  = (state = {}, action) => {
  const { type, error } = action;
  if(type === types.CLEAR_ERROR) {
    return {...state, error: null}
  } else if(error) {
    return {...state, error: error}
  }
  return state;
}

export default reducer;

export const getError = (state) => {
  return state.app.error
}