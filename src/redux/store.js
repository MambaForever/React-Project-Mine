// redux的核心管理对象store

/* 
  从redux库中引入: 1.创建store的createStore方法
                  2.使用redux中间件的方法
*/
import {createStore,applyMiddleware} from 'redux'

// 引入支持异步action的中间件
import thunk from 'redux-thunk'
// 引入支持redux调试工具的方法
import {composeWithDevTools} from 'redux-devtools-extension'

// 引入合并后的总reducer
import reducers from './reducers'

// 创建并暴露store
export default createStore(reducers,composeWithDevTools(applyMiddleware(thunk)))
