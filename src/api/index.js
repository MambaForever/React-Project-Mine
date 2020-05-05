// 向后台发送请求的函数库

// 引入jsonp库
import jsonp from 'jsonp'
// 按需引入antd组件标签
import {message} from 'antd'

// 引入二次封装后的axios
import ajax from './ajax'
// 引入一些重要配置常量
import {AK_VALUE,CITY} from '@/config'


// 通过jsonp方式发送ajax请求天气数据
let getJsonpWeather = () => {
  // 定义请求天气数据的url路径  http://api.map.baidu.com/telematics/v3/weather?location=xxx&output=json&ak=3p49MVra6urFRGOT9s8UBWr2
  let url = `http://api.map.baidu.com/telematics/v3/weather?location=${CITY}&output=json&ak=${AK_VALUE}`
  
  // 返回promise,在promise中发送异步请求
  return new Promise((resolve) => {
    // 定义获取天气数据的回调
    let getWeather = (err,data) => {
      if (data) {
        resolve(data.results)
      }else {
        message.error('获取当前天气信息失败!',1.5)
      }
    }
    // 通过jsonp发送请求
    jsonp(url,{timeout:3000},getWeather)
  })
}


// 向后台发送登录请求
let postLogin = userInfo => ajax.post('/login',userInfo)


// 向外暴露发送请求的函数
export {postLogin,getJsonpWeather}