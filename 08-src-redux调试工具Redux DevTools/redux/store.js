// redux的核心管理对象store

// 从redux模块中引入创建store的方法
import {createStore,applyMiddleware} from 'redux'
// 引入汇总后的总reducer
import reducers from './reducers'
// 引入支持异步action的react中间件
import thunk from 'redux-thunk'
// 引入可以开启redux调试工具的库
/* 
composeWithDevTools这个函数的返回值需在创建store时作为createStore的第二个参数传进去,
如第二个参数的位置已被占用,则将占用者作为composeWithDevTools的参数传入
如第二个参数已被applyMiddleware(thunk)占用,则将applyMiddleware(thunk)作为参数传进composeWithDevTools函数中
*/
import {composeWithDevTools} from 'redux-devtools-extension'

// 创建store时传的第二参数用于使用thunk中间件
export default createStore(reducers,composeWithDevTools(applyMiddleware(thunk)))