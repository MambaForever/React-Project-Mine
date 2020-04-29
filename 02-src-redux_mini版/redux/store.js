// 创建redux核心管理对象store

// 从redux模块中引入创建store的方法
import {createStore} from 'redux'
// 引入服务于Add组件的reducer
import addReducer from './addReducer'

let store = createStore(addReducer)

export default store