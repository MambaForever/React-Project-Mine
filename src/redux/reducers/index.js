// 合并reducer的文件

// 从redux库中引入合并reducer的方法
import {combineReducers} from 'redux'

// 引入所需reducer
import loginReducer from './login'

// 暴露合并后的reducer,传入的对象就是store管理的总状态state对象
export default combineReducers(
  {
    userInfo: loginReducer,  // 用户信息状态数据
  }
)