// 创建和login相关的action

// 引入相关action的type常量
import {SAVE_USERINFO,DELETE_USERINFO} from '../action_type'

// 将用户信息交给redux保管并存入localStorage
export const saveUserInfoAction = data => {
  let {user,token} = data
  // 将用户信息存入localStorage
  localStorage.setItem('userInfo',JSON.stringify(user))
  localStorage.setItem('token',token)
  return {type:SAVE_USERINFO,data}
}

// 删除redux中和localStorage中保存的用户信息的action
export const deleteUserInfoAction = () => {
  // 删除localStorage中保存的用户信息
  localStorage.clear()
  return {type:DELETE_USERINFO,data: {user:{},token:'',isLogin:false}}
}
