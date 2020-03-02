
import { combineReducers } from 'redux';
import products from './products';
import orders from './orders';
import comments from './comments';
import shops from './shops';

// 合并领域状态
const rootReducer = combineReducers({
  orders,
  products,
  shops,
  comments
})

export default rootReducer;