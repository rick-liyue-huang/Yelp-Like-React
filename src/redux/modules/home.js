
import { get, post } from '../../utils/request';
import url from '../../utils/url';
import { FETCH_DATA } from '../middlewares/api';
import { schema } from './entities/products';

// define actiontypes
export const types = {
  FETCH_LIKES_REQUEST: 'HOME/FETCH_LIKES_REQUEST', //获取猜你喜欢请求
  FETCH_LIKES_SUCCESS: 'HOME/FETCH_LIKES_SUCCESS', //获取猜你喜欢请求成功
  FETCH_LIKES_FAILURE: 'HOME/FETCH_LIKES_FAILURE', //获取猜你喜欢请求失败

};

/*
const fetchLikesRequest = () => ({
  type: types.FETCH_LIKES_REQUEST
});

const fetchLikesSuccess = (data) => ({
  type: types.FETCH_LIKES_SUCCESS,
  data
});

const fetchLikesFailure = (error) => ({
  type: types.FETCH_LIKES_FAILURE,
  error
});

*/

const fetchLikes = ( endpoint ) => ({
  [FETCH_DATA]: {
    types: [
      types.FETCH_LIKES_REQUEST,
      types.FETCH_LIKES_SUCCESS,
      types.FETCH_LIKES_FAILURE
    ],
    endpoint,
    schema
  },
  // params, // 希望后面的参数被next接收到
})

// define actions
export const actions = {
  loadLikes: () => {
    return (dispatch, getState) => {
      const endpoint = url.getProductList(0, 10);
      return dispatch(fetchLikes(endpoint))
    }
  },
  /*
  loadLikes: () => {
    return (dispatch, getState) => {
      dispatch(fetchLikesRequest());
      return get(url.getProductList(0, 10)).then(
        data => {
          dispatch(fetchLikesSuccess(data));
          // dispatch(action) // 在这里处理products的状态数据
        },
        error => {
          dispatch(fetchLikesFailure(error))
        }
      )
    } 
  }
  */
};



const reducer  = (state = {}, action) => {
  switch (action.type) {
    case types.FETCH_LIKES_REQUEST:
      // todo
    case types.FETCH_LIKES_SUCCESS:
      // todo
    case types.FETCH_LIKES_FAILURE:
      // todo
    default:
      return state;
  }
  
}

export default reducer;