// admin组件中Header和MenuNav子组件用于title交互的reducer

// 引入相关action的type常量
import {SAVE_TITLE} from '../action_type'

let initState = ''
export default (preState=initState,action) => {
  let {type,data} = action
  let newState
  switch (type) {
    case SAVE_TITLE:
      newState = data
      break;
  
    default:
      return preState
  }
  return newState

}

