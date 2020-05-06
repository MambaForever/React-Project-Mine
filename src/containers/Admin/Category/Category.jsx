import React, { Component } from 'react'

// 从react-redux库中引入connect函数创建父容器组件
import {connect} from 'react-redux'
// 从antd库中按需引入组件标签
import { Card ,Button,Table,Modal,Form,Input } from 'antd';
// 引入图标字体组件
import {PlusCircleOutlined} from '@ant-design/icons'

// 引入操作获取分类列表数据的异步action
import {updateCategoryListAsync} from '@/redux/actions/category'

// 引入样式文件
import './css/category.less'

@connect(
  state => ({categoryArr:state.categoryList}),  // 映射状态
  {updateCategoryListAsync}  // 映射操作状态的方法
)
class Category extends Component {

  state = { 
    visible: false  // 标识模态框是否弹出
  };

  // 组件挂载完成的生命周期钩子
  componentDidMount(){
    // 通知异步action发送获取分类列表请求
    this.props.updateCategoryListAsync()
  }

  // 点击添加按钮弹出模态框回调
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  // 点击模态框中确定按钮回调
  handleOk = e => {
    this.setState({
      visible: false,
    });
  };

  // 点击模态框中取消按钮回调
  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };


  render() {

    // 表格的数据源
    let {categoryArr} = this.props

    // 表格的列配置
    const columns = [
      {
        title: '分类名',  // 列名
        dataIndex: 'name',  // 该列在数据源中对应数据项的索引(名字)
        key: 'name'
      },
      {
        width: '24%',  // 列宽度
        title: '操作',  // 列名
        render: ()=>{  //render用于高级渲染，返回值展示到页面
          return <Button type="link">修改分类</Button>
        },
        align: 'center',  // 设置列的对齐方式
        key: 'handle'
      }
    ];


    return (
      <div className="category-center">
        <Card extra={
            <Button type="primary" onClick={this.showModal} ><PlusCircleOutlined />添加</Button>
          }
        >
          <Table 
            dataSource={categoryArr}  // 表格的数据源配置
            columns={columns}  // 表格的列配置
            pagination={{  // 分页器的配置
              pageSize:5  // 配置每页展示多少条数据
            }} 
            bordered  // 是否展示外边框和列边框
            rowKey="_id"  // 选择数据源中的某个属性作为key
          />
        </Card>
        <Modal
          title="新增分类"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="确定"
          cancelText="取消"
        >
          <Form>
            <Form.Item
              name="categoryName"
              rules={[{ required: true, message: '分类名必须输入!' }]}
            >
              <Input placeholder="请输入分类名" />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}

export default Category