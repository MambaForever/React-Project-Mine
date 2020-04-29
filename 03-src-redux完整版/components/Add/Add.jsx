import React, { Component } from 'react'
// 引入redux核心管理对象store
import store from '../../redux/store'
// 引入创建action的函数
import {addAction} from '../../redux/actions/add'
// 引入action类型的常量
import {INCREMENT,DECREMENT} from '../../redux/action_type'

export default class Add extends Component {

  increment = () => {
    let {value} = this.refs.num
    store.dispatch(addAction(INCREMENT,value*1))
  }

  decrement = () => {
    let {value} = this.refs.num
    store.dispatch(addAction(DECREMENT,value*1))
  }

  incrementOdd = () => {
    let count = store.getState()
    let {value} = this.refs.num
    if (count%2===1) {
      store.dispatch(addAction(INCREMENT,value*1))
    }
  }

  incrementAsync = () => {
    let {value} = this.refs.num
    setTimeout(() => {
      store.dispatch(addAction(INCREMENT,value*1))
    }, 1000);
  }

  render() {
    return (

      <div>
        <h1>总数count: {store.getState()}</h1>
        <select name="" ref="num">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        &nbsp;&nbsp;
        <button onClick={this.increment}>+</button>&nbsp;&nbsp;
        <button onClick={this.decrement}>-</button>&nbsp;&nbsp;
        <button onClick={this.incrementOdd}>increment if odd</button>&nbsp;&nbsp;
        <button onClick={this.incrementAsync}>increment async</button>
      </div>
    )
  }
}
