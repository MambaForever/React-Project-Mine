// 创建和login组件相关的reducer纯函数

// 引入相关action的type常量
import {SAVE_USERINFO,DELETE_USERINFO} from '../action_type'

// 尝试从localStorage中读取用户信息和token
let userInfo
try {
  // 如果localStorage中没有存入userInfo,那么读取userInfo的值为null,JSON.parse(null)结果也为null
  userInfo = JSON.parse(localStorage.getItem('userInfo'))
} catch (error) {
  userInfo = null
}
let token = localStorage.getItem('token')
let initState = {  // 定义用户信息的初始状态
  user: userInfo || {},
  token: token || '',
  isLogin: userInfo && token
}

// 暴露reducer
export default (preState=initState,action) => {
  let {type,data} = action
  let newState
  switch (type) {
    case SAVE_USERINFO:  // 保存用户信息
      newState = {...data,isLogin: true}
      break
    case DELETE_USERINFO:  // 删除用户信息
      newState = data
      break
  
    default:
      return preState
  }
  return newState

}
