// 服务于Add组件的reducer函数

// 引入action类型的常量
import {INCREMENT,DECREMENT} from '../action_type'

let initState = 0
export default function (preState=initState,action) {

  // 解构赋值传来的action对象
  let {type,data} = action
  let newState
  switch (type) {
    case INCREMENT:
      newState = preState + data
      return newState
    case DECREMENT:
      newState = preState - data
      return newState
  
    default:  // 初始化时才会走default
      return preState
  }
}
