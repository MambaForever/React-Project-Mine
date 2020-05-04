import React, { Component } from 'react'

// 从react-redux库中引入connect方法创建父容器组件
import {connect} from 'react-redux'

// 按需引入antd组件标签
import {Button,Modal} from 'antd'
// 从antd图标组件包中按需引入所需组件
import {
  FullscreenOutlined,
  FullscreenExitOutlined,
  ExclamationCircleOutlined 
} from '@ant-design/icons';

// 引入切换全屏的库screenfull
import screenfull from 'screenfull'

// 引入退出登录的action
import {deleteUserInfoAction} from '@/redux/actions/login'
// 引入样式文件
import './css/header.less'

// 从antd的Modal中引入confirm
const { confirm } = Modal;

class Header extends Component {

  state = {
    isFull: false,  // 当前页面是否全屏
  }

  // 组件挂载完成的生命周期钩子
  componentDidMount(){
    // 此方法监测屏幕是否全屏的变化
    screenfull.onchange(() => {
      let {isFull} = this.state
      this.setState({isFull:!isFull})
    })
  }

  // 点击全屏/退出全屏回调
  fullScreen = () => {
    screenfull.toggle()
  }

  // 点击退出登录的回调
  logout = () => {
    confirm({
      title: '你确定要退出登录吗?',
      icon: <ExclamationCircleOutlined />,
      content: '退出登录后将回到登录页面',
      okText:'确定',
      cancelText:'取消',
      onOk: () => {
        this.props.deleteUserInfoAction()
      },
      
    })
  }

  render() {
    return (
      <div className='header-wrap'>
        {/* 头部上方 */}
        <div className='header-top'>
          <Button size='small' onClick={this.fullScreen}>
            {this.state.isFull ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
          </Button>
          <span className='welcome'>欢迎, {this.props.name}</span>
          <Button type='link' size='small' onClick={this.logout}>退出登录</Button>
        </div>
        {/* 头部下方 */}
        <div className='header-bottom'>
          <h2 className='bottom-left'>首页</h2>
          <div className='bottom-right'>
            <span>2020年 05月05日 00:14:05</span>
            <img src="" alt="weather" />
            <span>小雨转雾</span>
            <span>温度: 14 ~ 26℃</span>
          </div>
        </div>
      </div>
    )
  }
}

// 创建并暴露Header父容器组件
export default connect(
  state => ({name:state.userInfo.user.username}),  //mapStateToProps
  {deleteUserInfoAction}  //mapDispatchToProps
)(Header)