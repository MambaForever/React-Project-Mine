import React from 'react'
import ReactDOM from 'react-dom'

// 从react-redux库中引入顶级组件Provider
import {Provider} from 'react-redux'

// 按需引入react路由组件标签
import {BrowserRouter} from 'react-router-dom'

// 引入redux的核心管理对象store
import store from './redux/store'

import App from './App'


// 渲染组件
ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
),document.querySelector('#root'))