/* 
  对axios进行二次封装实现下列功能
    1.配置请求的基础路径
		2.配置超时时间
		3.统一处理post请求json编码问题（转为urlencoded）
		4.统一返回真正的数据data，而不是response对象
		5.统一处理错误

*/
import axios from 'axios'
// 引入将对象转换成urlencoded的模块
import qs from 'querystring'
// 按需引入antd组件标签
import {message} from 'antd'

// 1.配置请求的基础路径
axios.defaults.baseURL = 'http://localhost:3000'
// 2.配置超时时间
axios.defaults.timeout = 2000

// 设置请求拦截器
axios.interceptors.request.use(config => {
  let {method,data} = config
  // 3.统一处理post请求json编码问题（转为urlencoded）
  if (method.toLowerCase() === 'post' && data instanceof Object) {
    config.data = qs.stringify(data)
  }
  return config
})

// 响应拦截器请求失败的回调
function handleError(error) {
  let msg = '未知错误'
  let errMsg = error.message
  if (errMsg.indexOf('timeout') !== -1) {
    msg = '请求超时'
  }else if (errMsg.indexOf('401') !== -1) {
    msg = '您的权限不够或未登录'
  } else if (errMsg.indexOf('Network') !== -1) {
    msg = '网络出错,请检查网络连接状况'
  }
  message.error(msg)
  // 中断promise链
  return new Promise(()=>{})
} 

// 设置响应拦截器
axios.interceptors.response.use(
  response => {
    return response.data
  },
  handleError
)


export default axios