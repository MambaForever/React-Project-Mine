// 和category组件相关的reducer纯函数

// 引入相关action的type常量
import {UPDATE_CATEGORY_LIST} from '../action_type'

let initState = []
// 创建并暴露category的reducer
export default (preState=initState,action) => {
  let {type,data} = action
  let newState
  switch (type) {
    case UPDATE_CATEGORY_LIST:
      newState = data
      break;
  
    default:
      return preState
  }
  return newState
}
