import React, { Component,useState } from 'react'

// 从antd库中按需引入组件标签
import { Card,Button,Table,Modal,Form,Input,message,Tree  } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

export default class Role extends Component {

  state = { 
    addVisible: false,  // 添加弹框的标识
    authVisible: false,  // 权限弹框的标识
  }

  // 开启添加弹窗
  showAddModal = () => {
    this.setState({
      addVisible: true,
    });
  };

  // 添加弹窗点击确定的回调
  handleAddOk = () => {
    let {addForm} = this.refs
    console.log(addForm.getFieldsValue().roleName)
    this.setState({
      addVisible: false,
    });
  };

  // 添加弹窗点击取消的回调
  handleAddCancel = () => {
    this.setState({
      addVisible: false,
    });
  };

  // 开启权限弹窗
  showAuthModal = () => {
    this.setState({
      authVisible: true,
    });
  };

  // 权限弹窗点击确定的回调
  handleAuthOk = () => {
    this.setState({
      authVisible: false,
    });
  };

  // 权限弹窗点击取消的回调
  handleAuthCancel = () => {
    this.setState({
      authVisible: false,
    });
  };

  render() {
    // 数据源
    const dataSource = [
      {
        key: '1',
        name: '商品管理员',
        create_time: '2020.05.05...',
        auth_time: '2020.05.05...',
      },
      {
        key: '2',
        name: '报表管理员',
        create_time: '2020.05.05...',
        auth_time: '2020.05.05...',
      },
    ];
    // 列配置
    const columns = [
      {
        title: '角色名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        key: 'create_time',
      },
      {
        title: '授权时间',
        dataIndex: 'auth_time',
        key: 'auth_time',
      },
      {
        title: '授权人',
        // dataIndex: 'auth_time',
        key: 'auth_name',
      },
      {
        title: '操作',
        // dataIndex: 'auth_time',
        key: 'handle',
        align: 'center',
        render: () => <Button type="link" onClick={this.showAuthModal}>设置权限</Button>
      },
    ];
    // 树形结构数据源
    const treeData = [
      {
        title: '0-0',
        key: '0-0',
        children: [
          {
            title: '0-0-0',
            key: '0-0-0',
            children: [
              {
                title: '0-0-0-0',
                key: '0-0-0-0',
              },
              {
                title: '0-0-0-1',
                key: '0-0-0-1',
              },
              {
                title: '0-0-0-2',
                key: '0-0-0-2',
              },
            ],
          },
          {
            title: '0-0-1',
            key: '0-0-1',
            children: [
              {
                title: '0-0-1-0',
                key: '0-0-1-0',
              },
              {
                title: '0-0-1-1',
                key: '0-0-1-1',
              },
              {
                title: '0-0-1-2',
                key: '0-0-1-2',
              },
            ],
          },
          {
            title: '0-0-2',
            key: '0-0-2',
          },
        ],
      },
      {
        title: '0-1',
        key: '0-1',
        children: [
          {
            title: '0-1-0-0',
            key: '0-1-0-0',
          },
          {
            title: '0-1-0-1',
            key: '0-1-0-1',
          },
          {
            title: '0-1-0-2',
            key: '0-1-0-2',
          },
        ],
      },
      {
        title: '0-2',
        key: '0-2',
      },
    ];
    return (
      <Card 
        title={
          <Button 
            type="primary"
            onClick={this.showAddModal}
          >
            <PlusOutlined />新增角色
          </Button>
        }
      >
        <Table 
          dataSource={dataSource} // 数据源
          columns={columns}  // 列配置
        />
        <Modal  // 添加的弹框
          title="新增角色"
          visible={this.state.addVisible}
          onOk={this.handleAddOk}
          onCancel={this.handleAddCancel}
          okText='确认'
          cancelText='取消'
        >
          <Form ref="addForm">
            <Form.Item
              name="roleName"
              rules={[{required:true,message:'请输入角色名!'}]}
            >
              <Input placeholder="请输入角色名"/>
            </Form.Item>
          </Form>
        </Modal>
        <Modal  // 权限的弹框
          title="设置权限"
          visible={this.state.authVisible}
          onOk={this.handleAuthOk}
          onCancel={this.handleAuthCancel}
          okText='确认'
          cancelText='取消'
        >
          <Tree
            checkable
            treeData={treeData}
          />
        </Modal>
      </Card>
    )
  }
}
