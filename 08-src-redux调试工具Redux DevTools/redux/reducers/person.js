// 服务于Preson组件的reducer函数

// 引入person组件action的type常量
import {ADD_PERSON} from '../action_type'

let initState = [
  {id:24,name:'kobe',age:18},
  {id:30,name:'curry',age:32},
  {id:23,name:'james',age:35},
]
// 向外暴露reducer函数
export default (preState=initState,action) => {
  let {type,data} = action
  switch (type) {
    case ADD_PERSON:
      
      return [data,...preState]
  
    default:
      return preState
  }
}
