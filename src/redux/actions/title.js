// admin组件中Header和MenuNav子组件用于title交互的action

// 引入相关action的type常量
import {SAVE_TITLE} from '../action_type'

// 保存title数据的action
export const saveTitleAction = title => {
  return {type:SAVE_TITLE,data:title}
}
