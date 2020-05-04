import React, { Component } from 'react'
// 按需引入react路由相关组件标签
import {Route,Switch,Redirect} from 'react-router-dom'

// 引入一级路由组件
import Login from './containers/Login/Login'
import Admin from './containers/Admin/Admin'

export default class App extends Component {
  render() {
    return (
      
        <Switch>
          {/* 注册路由 */}
          <Route path="/login" component={Login} />
          <Route path="/admin" component={Admin} />
          <Redirect to='/login' />
        </Switch>
      
    )
  }
}
