// 创建和category组件相关的action

// 引入相关action的type常量
import {UPDATE_CATEGORY_LIST} from '../action_type'
// 引入发送请求的API
import {getCategoryList} from '@/api'
// 按需引入antd组件标签
import {message} from 'antd'

// 更新分类列表的同步action
export const updateCategoryList = data => {
  return {type:UPDATE_CATEGORY_LIST,data}
}

// 更新分类列表的异步action
export const updateCategoryListAsync = () => {
  return async dispatch => {
    let result = await getCategoryList()
    if (result.status===0) {
      dispatch(updateCategoryList(result.data))
    }else {
      message.error(result.msg)
    }
  }
}