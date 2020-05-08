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
      newState = data.reverse()  // 由于后台数据做的不好,需要我们在接收后手动将数据翻转以保证人性化显示
      break;
  
    default:
      return preState
  }
  return newState
}
