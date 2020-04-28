import React from 'react'
import ReactDOM from 'react-dom'

// 按需引入react路由组件标签
import {BrowserRouter} from 'react-router-dom'

import App from './App'


// 渲染组件
ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
),document.querySelector('#root'))