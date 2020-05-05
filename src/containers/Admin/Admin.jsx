// Admin的父容器组件

import React, { Component } from 'react'
// 从react-redux库中引入connect方法创建父容器组件
import {connect} from 'react-redux'
// 从路由库中引入所需标签组件
import {Redirect} from 'react-router-dom'
// 从antd库中按需引入标签组件(layout标签)
import {Layout} from 'antd'

// 引入高阶组件校验用户权限
import CheckLogin from '@/containers/Hoc/CheckLogin'
// 引入退出登录并删除用户信息的action
import {deleteUserInfoAction} from '@/redux/actions/login'
// 引入样式文件
import './css/admin.less'
// 引入子组件
import Header from './Header/Header'

const { Footer, Sider, Content } = Layout;

// 改用装饰器语法使用connect方法创建Admin父容器组件
@connect(
  state => ({isLogin: state.userInfo.isLogin}),  // mapStateToProps
  {deleteUserInfoAction}  // mapDispatchToProps
)
@CheckLogin  // 使用装饰器语法调用高阶组件并传入Admin组件做校验
class Admin extends Component {

  logout = () => {
    this.props.deleteUserInfoAction()
  }

  render() {
    // 判断当前是否为登录状态,如果不是,直接跳转到登录页面
    // let {isLogin} = this.props
    // if (!isLogin) return <Redirect to="/login" />
    return (
      <Layout className="admin-wrap">
        <Sider>Sider</Sider>
        <Layout>
          <Header />
          <Content>Content</Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
      
    )
  }
}

export default Admin

// 创建并暴露Admin父容器组件
/* export default connect(
  state => ({isLogin: state.userInfo.isLogin}),  // mapStateToProps
  {deleteUserInfoAction}  // mapDispatchToProps
)(Admin) */
