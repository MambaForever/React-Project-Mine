import React, { Component } from 'react'
// 引入redux的核心管理对象store
import store from '../../redux/store'
// 引入所需的通知store的action
import {increment,decrement} from '../../redux/actions/count'

export default class Count extends Component {

  // 加按钮回调
  increment = () => {
    let {value} = this.refs.num
    store.dispatch(increment(value*1))
  }

  // 减按钮回调
  decrement = () => {
    let {value} = this.refs.num
    store.dispatch(decrement(value*1))
  }

  // 如果是奇数才增加钮回调
  incrementOdd = () => {
    let count = store.getState()
    let {value} = this.refs.num
    if (count%2===1) {
      store.dispatch(increment(value*1))
    }
  }

  // 异步增加按钮回调
  incrementAsync = () => {
    setTimeout(() => {
      let {value} = this.refs.num
      store.dispatch(increment(value*1))
    }, 500);
  }

  render() {
    return (
      <div>
        <h2>总数为: {store.getState()}</h2>
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
