// 此文件用于创建和count组件相关的action

/* 
  和count相关的有两个action:
  加: increment
  减: decrement
*/

// 引入action类型需要的常量
import {INCREMENT,DECREMENT} from '../action_type'

// 加的action
function increment(value) {
  return {type:INCREMENT,data:value}
}
// 减的action
function decrement(value) {
  return {type:DECREMENT,data:value}
}
// 延迟???秒再加的异步action(函数式action)
function incrementAsync(value,time) {
  /* 
    当redux底层读到传递的action是个函数时,会自动调用该函数并传入dispatch
  */
  return (dispatch) => {
    setTimeout(() => {
      dispatch(increment(value))
    }, time);
  }
}

export default {increment,decrement,incrementAsync}
