/* 
  对axios进行二次封装实现下列功能
    1.配置请求的基础路径
		2.配置超时时间
		3.统一处理post请求json编码问题（转为urlencoded）
		4.统一返回真正的数据data，而不是response对象
    5.统一处理错误
    6.请求统一添加进度条
    7.如果有token,请求统一携带token
*/
import axios from 'axios'
// 引入将对象转换成urlencoded的模块
import qs from 'querystring'
// 按需引入antd组件标签
import {message} from 'antd'
// 引入加载进度条的nprogress库及样式
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// 引入redux核心管理对象store
import store from '@/redux/store'
// 引入删除用户信息的action
import {deleteUserInfoAction} from '@/redux/actions/login'

// 1.配置请求的基础路径
axios.defaults.baseURL = '/api'
// 2.配置超时时间
axios.defaults.timeout = 2000

// 设置请求拦截器
axios.interceptors.request.use(config => {
  // 6.请求统一添加进度条
  NProgress.start()
  let {method,data} = config
  // 3.统一处理post请求json编码问题（转为urlencoded）
  if (method.toLowerCase() === 'post' && data instanceof Object) {
    config.data = qs.stringify(data)
  }
  // 7.如果有token,请求统一携带token
  let token = store.getState().userInfo.token
  if (token) {
    config.headers.Authorization = 'atguigu_' + token  // token前面都加上"atguigu_",安全性高一些
  }
  return config
})

// 响应拦截器请求失败的回调
function handleError(error) {
  // 6.请求统一添加进度条
  NProgress.done()
  let msg = '未知错误'
  let errMsg = error.message
  if (errMsg.indexOf('timeout') !== -1) {
    msg = '请求超时'
  }else if (errMsg.indexOf('401') !== -1) {  // 如果请求返回401即身份过期,则删除所有用户信息并跳转到登录页面
    msg = '身份过期或未登录,需重新登录'
    store.dispatch(deleteUserInfoAction())
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
    // 6.请求统一添加进度条
    NProgress.done()
    return response.data
  },
  handleError
)


export default axios