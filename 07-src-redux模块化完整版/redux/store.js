// redux的核心管理对象store

// 从redux模块中引入创建store的方法
import {createStore,applyMiddleware} from 'redux'
// 引入汇总后的总reducer
import reducers from './reducers'
// 引入支持异步action的react中间件
import thunk from 'redux-thunk'

// 创建store时传的第二参数用于使用thunk中间件
export default createStore(reducers,applyMiddleware(thunk))