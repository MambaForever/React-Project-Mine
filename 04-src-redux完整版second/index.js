import React from 'react'
import ReactDOM from 'react-dom'
// 引入redux的核心管理对象store
import store from './redux/store'

// 引入子组件
import App from './App'

// 渲染组件
ReactDOM.render(<App />,document.querySelector('#root'))

// 通过store的subscribe方法在redux管理的状态发生改变时重新渲染组件
store.subscribe(() => {
  ReactDOM.render(<App />,document.querySelector('#root'))
})
