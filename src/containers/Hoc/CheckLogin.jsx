// 用于校验用户登录状态来确定哪些组件可以被访问的高阶组件

/* 
  高阶组件: 接收一个组件,返回一个新组件
*/
// 引入react核心库创建新的组件
import React,{Component} from 'react'
// 按需引入路由库中的组件标签
import {Redirect} from 'react-router-dom'
// 由于用到redux中的状态做校验,所以引入相关方法
import {connect} from 'react-redux'

// 创建并暴露高阶组件
export default (PreComponent) => {
  // 通过装饰器语法使用connect创建新组件的父容器组件
  @connect(
    state => ({isLogin: state.userInfo.isLogin})
  )
  class TargetComponent extends Component {

    render(){
      let {pathname} = this.props.location  //获取访问的地址
      let {isLogin} = this.props  //获取登录标识
      // 校验用户登录状态确定访问权限
      if (isLogin && pathname==='/login') {  // 如果已经登录并且想访问login组件,则让你跳转到admin组件
        return <Redirect to="/admin" />
      }else if (!isLogin && pathname.indexOf('/admin')===0 ) {  // 如果未登录并且想访问admin相关组件,则让你跳转到login组件
        return <Redirect to="/login" />
      }else {
        // 之前传递的参数原封不动传回去
        return <PreComponent {...this.props} />
      }
      
    }
  }

  return TargetComponent
}



