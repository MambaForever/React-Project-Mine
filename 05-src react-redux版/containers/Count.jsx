// Count的容器组件

// 从react-redux模块中引入connect函数
import {connect} from 'react-redux'
// 引入Count子UI组件所用的action
// import {increment,decrement} from '../redux/actions/count'
import actionsObj from '../redux/actions/count'

// 引入Count UI子组件
import Count from '../components/Count/Count'

/* 
  connect函数调用的返回值是个函数,返回的函数再调用的返回值才是容器组件
  connect函数的两个参数:mapStateToProps/mapDispatchToProps是两个函数,这个两个函数的参数由react-redux底层
  调用时传入,分别是redux管理的状态state和store的dispatch方法, 两个函数的返回值都通过props对象传递给子UI组件
  connect函数调用返回的函数传入的组件,将作为容器组件的子组件
*/
// let mapStateToProps = (state) => {
//   return {sum:state}
// }

// let mapDispatchToProps = (dispatch) => {
//   return {
//     increment: (value) => {dispatch(increment(value))},
//     decrement: (value) => {dispatch(decrement(value))},
//   }
// }

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Count)

/* 
  精简写法: mapDispatchToProps也可以是对象形式,
  react-redux底层会将对象自动转成函数形式并返回加工好的对象 
*/
export default connect(
  state => ({sum:state}),  // mapStateToProps
  actionsObj
)(Count)
