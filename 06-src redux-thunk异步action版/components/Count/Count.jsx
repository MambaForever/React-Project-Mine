import React, { Component } from 'react'

export default class Count extends Component {

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
        <h2>总数为: {this.props.sum}</h2>
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
