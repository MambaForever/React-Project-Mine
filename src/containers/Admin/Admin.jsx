// Admin的父容器组件

import React, { Component } from 'react'
// 从react-redux库中引入connect方法创建父容器组件
import {connect} from 'react-redux'
// 从antd库中按需引入标签组件(layout标签)
import {Layout} from 'antd'
// 从react-router-dom库中按需引入组件标签
import {Route,Switch,Redirect} from 'react-router-dom'

// 引入高阶组件校验用户权限
import CheckLogin from '@/containers/Hoc/CheckLogin'
// 引入样式文件
import './css/admin.less'
// 引入子组件
import Header from './Header/Header'
import MenuNav from './MenuNav/MenuNav'
// 引入路由子组件
import Bar from './Bar/Bar'
import Category from './Category/Category'
import Home from './Home/Home'
import Line from './Line/Line'
import Pie from './Pie/Pie'
import Product from './Product/Product'
import Role from './Role/Role'
import User from './User/User'


const { Footer, Sider, Content } = Layout;

// 改用装饰器语法使用connect方法创建Admin父容器组件
@connect(
  state => ({isLogin: state.userInfo.isLogin}),  // mapStateToProps
  {}  // mapDispatchToProps
)
@CheckLogin  // 使用装饰器语法调用高阶组件并传入Admin组件做校验
class Admin extends Component {

  render() {
    return (
      <Layout className="admin-wrap">
        <Sider>
          <MenuNav />
        </Sider>
        <Layout>
          <Header />
          <Content>
            {/* 注册路由 */}
            <Switch>
              <Route path='/admin/home' component={Home} />
              <Route path='/admin/prod_about/category' component={Category} />
              <Route path='/admin/prod_about/product' component={Product} />
              <Route path='/admin/user' component={User} />
              <Route path='/admin/role' component={Role} />
              <Route path='/admin/charts/bar' component={Bar} />
              <Route path='/admin/charts/line' component={Line} />
              <Route path='/admin/charts/pie' component={Pie} />
              {/* 路由重定向 */}
              <Redirect to='/admin/home' />
            </Switch>
          </Content>
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
