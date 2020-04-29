import React from 'react'
import ReactDOM from 'react-dom'
// 引入redux的核心管理对象store
import store from './redux/store'
// 引入react-redux模块提供的Provider组件标签,用于让所有容器组件得到store对象
import {Provider} from 'react-redux'

// 引入子组件
import App from './App'

// 渲染组件
ReactDOM.render((
  /* 
    顶级组件Provider,将store对象作为标签属性传递下去,所有的容器组件在用到store时,
    react-redux底层就会自动接收到store,就不用引入了
  */
  <Provider store={store}>
    <App />
  </Provider>
),document.querySelector('#root'))

