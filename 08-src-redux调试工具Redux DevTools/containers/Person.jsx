// Person子UI组件的容器组件

import React, { Component } from 'react'
// 引入生成唯一id的库uuid
import { v4 as uuidv4 } from 'uuid'

// 从react-redux中引入connect方法
import {connect} from 'react-redux'
// 引入Person子UI组件相关的action
import {addPerson} from '../redux/actions/person'

// Person UI子组件
class Person extends Component {
  add = () => {
    let {name,age} = this
    // 校验用户输入
    if (!name.value.trim()||!age.value.trim()) {
      return alert('憋瞎按!!')
    }
    let id = uuidv4()
    this.props.addPerson({id,name:name.value.trim(),age:age.value.trim()})
    // 清空用户输入
    this.name.value = ''
    this.age.value = ''

  }

  render() {
    let {persons,sum} = this.props

    return (
      <div>
        <h2>总人数: {persons.length}  上方总数量: {sum} </h2>
        <label>
          姓名: <input type="text" ref={node => this.name = node} />
        </label>&nbsp;
        <label>
          年龄: <input type="text" ref={node => this.age = node} />
        </label> &nbsp;
        <button onClick={this.add}>添加</button>
        <ul>
          {
            persons.map(person => <li key={person.id}>姓名:{person.name}, 年龄:{person.age}</li>)
          }
        </ul>
      </div>
    )
  }
}

// 创建并暴露Person容器组件
export default connect(
  state => ({persons:state.persons,sum:state.count}),  // 映射状态的mapStateToProps
  {addPerson}  // 映射分发action的mapDispatchToProps
)(Person)