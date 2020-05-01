import React, { Component } from 'react'

// 引入子组件
import Count from './containers/Count'
import Person from './containers/Person'
import Mamba from './components/Mamba/Mamba'

export default class App extends Component {
  render() {
    return (
      <div>
        <Mamba />
        <hr/>
        <Count />
        <hr/>
        <Person />
      </div>
    )
  }
}

