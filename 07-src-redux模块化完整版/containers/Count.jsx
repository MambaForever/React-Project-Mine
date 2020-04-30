// Count的容器组件
import React, { Component } from 'react'

// 从react-redux模块中引入connect函数
import {connect} from 'react-redux'
// 引入Count子UI组件所用的action
// import {increment,decrement,incrementAsync} from '../redux/actions/count'
import actionsObj from '../redux/actions/count'

// Count UI组件
class Count extends Component {

  // 加按钮回调
  increment = () => {
    let {value} = this.refs.num
    this.props.increment(value*1)
  }

  // 减按钮回调
  decrement = () => {
    let {value} = this.refs.num
    this.props.decrement(value*1)
  }

  // 如果是奇数才增加钮回调
  incrementOdd = () => {
    let count = this.props.sum
    let {value} = this.refs.num
    if (count%2===1) {
      this.props.increment(value*1)
    }
  }

  // 异步增加按钮回调
  incrementAsync = () => {
    let {value} = this.refs.num
    this.props.incrementAsync(value*1,1000)
  }

  render() {
    return (
      <div>
        <h2>总数为: {this.props.sum} 下方总人数为: {this.props.personCount}</h2>
        <select ref='num'>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>&nbsp;&nbsp;
        <button onClick={this.increment}>+</button> &nbsp;&nbsp;
        <button onClick={this.decrement}>-</button> &nbsp;&nbsp;
        <button onClick={this.incrementOdd}>increment if odd</button> &nbsp;&nbsp;
        <button onClick={this.incrementAsync}>increment async</button>
      </div>
    )
  }
}

/* 
  connect函数调用的返回值是个函数,返回的函数再调用的返回值才是容器组件
  connect函数的两个参数:mapStateToProps/mapDispatchToProps是两个函数,这个两个函数的参数由react-redux底层
  调用时传入,分别是redux管理的状态state和store的dispatch方法, 两个函数的返回值都通过props对象传递给子UI组件
  connect函数调用返回的函数传入的组件,将作为容器组件的子组件
*/

/* 
  精简写法: mapDispatchToProps也可以是对象形式,
  react-redux底层会将对象自动转成函数形式并返回加工好的对象 
*/
// 创建并暴露Count容器组件
export default connect(
  state => ({sum:state.count,personCount:state.persons.length}),  // mapStateToProps
  actionsObj
  // {increment,decrement,incrementAsync}
)(Count)
