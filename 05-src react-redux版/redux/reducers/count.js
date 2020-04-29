// 这是为count组件服务的reducer函数

// 引入需要的action类型常量
import {INCREMENT,DECREMENT} from '../action_type'

// 设置状态的初始值
let initState = 0

export default  function (preState=initState,action) {
  let newState
  let {type,data} = action
  switch (type) {
    case INCREMENT:
      return newState = preState + data
    case DECREMENT:
      return newState = preState - data
  
    default:
      return preState
  }
}