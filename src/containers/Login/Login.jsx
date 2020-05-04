// Login父容器组件

import React, { Component } from 'react'

// 从react-redux库中引入connect方法创建父容器组件
import {connect} from 'react-redux'
// 引入相关action
import {saveUserInfoAction} from '@/redux/actions/login'

// 引入react路由所需组件标签
import {Redirect} from 'react-router-dom'
// 按需引入antd组件标签
import { Form, Input, Button, message } from 'antd'
// 引入相关图标字体
import { UserOutlined, LockOutlined } from '@ant-design/icons';
// 引入发送请求的函数
import {postLogin} from '@/api'
// 引入样式文件
import './css/Login.less'
// 引入图片路径
import logo from './images/logo.png'

class Login extends Component {

  // 提交表单的回调
  onFinish = async values => {
    let result = await postLogin(values)
    if (result.status === 0) {
      this.props.saveUserInfoAction(result.data)
      // 编程式跳转到admin路由组件
      this.props.history.replace("/admin")
    }else if (result.status === 1) {
      message.error(result.msg,1.5)
    }
  }

  // 密码验证的规则函数
  /*
  用户名/密码的的合法性要求
  1). 必须输入
  2). 必须大于等于4位
  3). 必须小于等于12位
  4). 必须是英文、数字或下划线组成
 */
  pwdRule = (_,value) => {
    let errArr = []
    // 1). 必须输入
    if (!value.trim()) {return Promise.reject('请输入密码')}
    // 2). 必须大于等于4位
    if (value.length<4) errArr.push('密码必须大于等于4位')
    // 3). 必须小于等于12位
    if (value.length>12) errArr.push('密码必须小于等于12位')
    // 4). 必须是英文、数字或下划线组成
    if (!(/^\w+$/).test(value)) errArr.push('密码必须是字母、数字或下划线组成')
    if (errArr.length !== 0) {
      return Promise.reject(errArr)
    }else {
      return Promise.resolve()
    }
    
  }


  render() {
    // 判断当前是否登录,如果已登录,就跳转到admin路由页面
    let {isLogin} = this.props
    if (isLogin) return <Redirect to="/admin" />
    return (
      <div className="wrap">
        <header>
          <img src={logo} alt="logo" />
          <h1>Mamba Forever</h1>
        </header>
        <div className="login">
          <span className="txt">用户登录</span>
          <Form
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={this.onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: '请输入用户名!',
                },
                {
                  min: 4,
                  message: '用户名必须大于等于4位!',
                },
                {
                  max: 12,
                  message: '用户名必须小于等于12位!',
                },
                {
                  pattern: /^\w+$/,
                  message: '用户名必须是字母、数字或下划线组成!',
                },

              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  validator: this.pwdRule
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
            </Form.Item>
          </Form>
        </div>
        {/* <Route path="/admin" component={Admin} /> */}
      </div>
    )
  }
}

// 创建并暴露login父容器组件
export default connect(
  state => ({isLogin:state.userInfo.isLogin}),
  {saveUserInfoAction}
)(Login)
