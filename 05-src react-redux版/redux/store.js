// redux的核心管理对象store

// 从redux模块中引入创建store的方法
import {createStore} from 'redux'
// 引入和count组件相关的reducer
import countReducer from './reducers/count'

export default createStore(countReducer)