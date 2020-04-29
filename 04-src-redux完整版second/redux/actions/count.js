// 此文件用于创建和count组件相关的action

/* 
  和count相关的有两个action:
  加: increment
  减: decrement
*/

// 引入action类型需要的常量
import {INCREMENT,DECREMENT} from '../action_type'

// 加的action
export function increment(value) {
  return {type:INCREMENT,data:value}
}
// 减的action
export function decrement(value) {
  return {type:DECREMENT,data:value}
}
