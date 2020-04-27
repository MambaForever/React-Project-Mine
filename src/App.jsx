import React, { Component } from 'react'
// 按需引入antd组件标签
import {Button} from 'antd'

export default class App extends Component {
  render() {
    return (
      <div>
        <h2>App...</h2>
        <Button>chilk me</Button>
        <Button type="primary">touch me</Button>
      </div>
    )
  }
}
