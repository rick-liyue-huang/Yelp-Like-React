
// 因为schema是代表的领域实体，因此需要定义到对应的领域实体
export const schema = {
  name: 'products',
  id: 'id' // 查看 mock/products/likes.json
}

const reducer  = (state = {}, action) => {
  if(action.response && action.response.products) {
    // 当前的action是调用api获取成功后获取的数据
    return {...state, ...action.response.products}
  }
  return state;
}

export default reducer;