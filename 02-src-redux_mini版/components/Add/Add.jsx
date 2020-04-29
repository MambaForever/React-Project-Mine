import React, { Component } from 'react'
// 引入redux核心管理对象store
import store from '../../redux/store'

export default class Add extends Component {
  

  increment = () => {
    let {value} = this.refs.num
    store.dispatch({type:'increment',data:value*1})
  }

  decrement = () => {
    let {value} = this.refs.num
    store.dispatch({type:'decrement',data:value*1})
  }

  incrementOdd = () => {
    let count = store.getState()
    let {value} = this.refs.num
    if (count%2===1) {
      store.dispatch({type:'increment',data:value*1})
    }
  }

  incrementAsync = () => {
    let {value} = this.refs.num
    setTimeout(() => {
      store.dispatch({type:'increment',data:value*1})
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
        
        <button onClick={this.increment}>+</button>
        <button onClick={this.decrement}>-</button>
        <button onClick={this.incrementOdd}>increment if odd</button>
        <button onClick={this.incrementAsync}>increment async</button>
      </div>
    )
  }
}
