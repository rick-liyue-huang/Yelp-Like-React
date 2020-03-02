
// define middlewares

import { get } from '../../utils/request';
import { schema } from '../modules/entities/products';

// 凡是有这个属性的action都需要中间件的处理
export const FETCH_DATA = 'FETCH_DATA';

export default store => next => action => {
  
  const callAPI = action[FETCH_DATA];
  if(typeof callAPI === 'undefined') {
    return next(action); // 交由后面的中间件处理
  }

  const  { endpoint, schema, types } = callAPI;
  if(typeof endpoint !== 'string') {
    throw new Error('endpoint must be string type URL')
  }
  if(!schema) {
    throw new Error('must have entities schema')
  }
  if(!Array.isArray(types) && types.length !== 3) {
    throw new Error('need three types array');
  } 
  if(!types.every(type => typeof type === 'string')) {
    throw new Error('action type must be string');
  }

  // 创建增强版的action
  const actionWith = data => {
    const finalAction = {...action, ...data}; 
    // 在原有action的基础上扩展了data
    delete finalAction[FETCH_DATA];
    // 并且原先action中的属性删除
    return finalAction
  }

  const [requestType, successType, failType] = types;

  next(actionWith({type: requestType}));
  return FETCH_DATA(endpoint, schema).then(
    response => next(actionWith({
      type: successType,
      response
    })),
    error => next(actionWith({
      type: failType,
      error: error.message || 'get data fail'
    }))
  )
}


// 执行网络请求
const fetchData = (endpoint, schema) => {
  return get(endpoint).then(data => {
    // 扁平化处理
    return normalizeData(data, schema)
  })
}

// 根据schema, 将获取的数据扁平化
const normalizeData = (data, schema) => {
  const { id, name } = schema;
  let kvObj = {};
  let ids = []; // 存储获取的数据中的id
  if(Array.isArray(data)) {
    data.forEach(item => {
      kvObj[item[id]] = item; 
      ids.push(item[id])
    })
  } else {
    // 是一个对象
    kvObj[data[id]] = data;
    ids.push(data[id]);
  }
  return {
    [name]: kvObj,
    ids
  }
}