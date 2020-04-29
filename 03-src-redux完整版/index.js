import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'

// 引入redux核心管理对象store
import store from './redux/store'


// 渲染组件
ReactDOM.render(<App />,document.querySelector('#root'))

// store对象的subcribe方法: redux中保存管理的状态发生改变时,调用此方法传进去的回调
store.subscribe(() => {
  ReactDOM.render(<App />,document.querySelector('#root'))
})