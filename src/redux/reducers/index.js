// 汇总所有reducer函数的文件

// 从redux中引入汇总reducer的方法
import {combineReducers} from 'redux'
// 引入和count组件相关的reducer
import countReducer from './count'
// 引入和person组件相关的reducer
import personReducer from './person'

/* 
combineReducers中传入的就是汇总后的redux总状态state对象
*/
export default combineReducers({
  count: countReducer,
  persons: personReducer
})
