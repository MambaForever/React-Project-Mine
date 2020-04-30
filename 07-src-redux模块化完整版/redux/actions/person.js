// 此文件用于创建和person相关的action

// 引入person的action type相关的常量
import {ADD_PERSON} from '../action_type'

export function addPerson(person) {
  return {type:ADD_PERSON,data:person}
}
