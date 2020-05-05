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
// 引入处理时间日期的dayjs库
import dayjs from 'dayjs'

// 引入获取天气信息的方法
import {getJsonpWeather} from '@/api'

// 引入退出登录的action
import {deleteUserInfoAction} from '@/redux/actions/login'
// 引入样式文件
import './css/header.less'

// 从antd的Modal中引入confirm
const { confirm } = Modal;

// 改用装饰器语法使用connect方法创建Header父容器组件
@connect(
  state => ({name:state.userInfo.user.username}),  //mapStateToProps
  {deleteUserInfoAction}  //mapDispatchToProps
)
class Header extends Component {

  state = {
    isFull: false,  // 当前页面是否全屏
    weatherData: {},  // 获取的天气信息数据
    time: '', // 当前时间数据
  }

  // 组件挂载完成的生命周期钩子
  componentDidMount(){
    // 此方法监测屏幕是否全屏的变化
    screenfull.onchange(() => {
      let {isFull} = this.state
      this.setState({isFull:!isFull})
    })

    // 获取/更新天气信息的函数: 暂时写在"欢迎"的点击回调中,防止请求次数过多

    // 开启定时器配合dayjs更新当前日期时间
    this.timer = setInterval(() => {
      this.setState( {time: dayjs().format('YYYY年  MM月DD日  HH:mm:ss  ')} )
    }, 1000);
  }

  // 组件将要卸载的生命周期钩子
  componentWillUnmount(){  // 在此钩子中做取消定时器等操作
    clearInterval(this.timer)
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

  // 点击获取/更新天气信息的测试回调
  getWeather = async () => {
    let result = await getJsonpWeather()
    // 从获取的天气数据中得到天气图片路径、天气和温度信息
    let {currentCity} = result[0]
    let {dayPictureUrl,weather,temperature} = result[0].weather_data[0]
    this.setState({weatherData:{currentCity,dayPictureUrl,weather,temperature}})
  }

  render() {
    let {currentCity,dayPictureUrl,weather,temperature} = this.state.weatherData
    return (
      <div className='header-wrap'>
        {/* 头部上方 */}
        <div className='header-top'>
          <Button size='small' onClick={this.fullScreen}>
            {this.state.isFull ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
          </Button>
          <span className='welcome' onClick={this.getWeather}>欢迎, {this.props.name}</span>
          <Button type='link' size='small' onClick={this.logout}>退出登录</Button>
        </div>
        {/* 头部下方 */}
        <div className='header-bottom'>
          <h2 className='bottom-left'>首页</h2>
          <div className='bottom-right'>
            <span>{this.state.time}</span>
            <span>{currentCity}</span>
            <img src={dayPictureUrl} alt="weather" width='24px' />
            <span>{weather}</span>
            <span>{temperature}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default Header

// 创建并暴露Header父容器组件
/* export default connect(
  state => ({name:state.userInfo.user.username}),  //mapStateToProps
  {deleteUserInfoAction}  //mapDispatchToProps
)(Header) */