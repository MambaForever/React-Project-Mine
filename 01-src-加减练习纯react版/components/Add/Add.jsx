import React, { Component } from 'react'

export default class Add extends Component {
  state = {
    count: 0
  }

  increment = () => {
    let {count} = this.state
    let {value} = this.refs.num
    count += value*1
    this.setState({count})
  }

  decrement = () => {
    let {count} = this.state
    let {value} = this.refs.num
    count -= value*1
    this.setState({count})
  }

  incrementOdd = () => {
    let {count} = this.state
    let {value} = this.refs.num
    if (count%2===1) {
      count += value*1
      this.setState({count})
    }
  }

  incrementAsync = () => {
    let {count} = this.state
    let {value} = this.refs.num
    setTimeout(() => {
      count += value*1
      this.setState({count})
    }, 1000);
  }

  render() {
    return (

      <div>
        <h1>总数count: {this.state.count}</h1>
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
