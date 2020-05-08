import React, { Component } from 'react'

// 从react-redux库中引入connect函数创建父容器组件
import {connect} from 'react-redux'
// 从antd库中按需引入组件标签
import { Card ,Button,Table,Modal,Form,Input,message } from 'antd';
// 引入图标字体组件
import {PlusCircleOutlined} from '@ant-design/icons'

// 引入发送ajax请求的方法
import {postAddCategory,postUpdateCategory} from '@/api'
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
    visible: false,  // 标识模态框是否弹出
  };

  // 组件挂载完成的生命周期钩子
  componentDidMount(){
    // 通知异步action发送获取分类列表请求
    this.props.updateCategoryListAsync()
  }

  // 点击添加/修改按钮的回调
  showModal = (categoryObj) => {
    let {categoryForm} = this.refs
    // 每次点击重置this上的属性
    this.categoryId = ''
    this.categoryName = ''
    this.isUpdate = false
    let {_id,name} = categoryObj
    // 判断点击的是添加还是修改按钮
    if (_id && name) { // 点击修改
      this.categoryId = _id  // 将id保存在this上,方便在发送更新分类名请求时传参
      this.categoryName = name  // 将name保存在this上,方便数据回显的初始化显示使用
      this.isUpdate = true  // 将当前是更新的状态保存在this上
    }
    // 设置数据的回显:如果模态框非初次弹出,设置当前表单中对应输入框的值(初次弹出靠initialValues)
    if (categoryForm) categoryForm.setFieldsValue({categoryName:name})
    this.setState({  // 弹出模态框
      visible: true,
    });
  };

  // 点击模态框中确定按钮回调
  handleOk = async () => {
    // 得到Form标签的实例
    let {categoryForm} = this.refs
    // 通过Form实例上的getFieldsValue方法得到表单中输入的值
    let {categoryName} = categoryForm.getFieldsValue()
    // 校验用户输入:1.不能为空  2.添加或修改的类名不能和已存在类名重复
    let hasName = this.props.categoryArr.find(category => category.name===categoryName.trim()) 
    if (!categoryName && !categoryName.trim()) message.error('分类名不能为空或空格!')  // 校验分类名不能为空
    else if (hasName) message.error('分类名已存在!')  // 校验输入的分类名不能和已存在分类名重复
    else { // 校验通过,判断当前操作并发送对应请求及关闭模态框
      // 定义变量接收请求返回值
      let result 
      // 判断当前操作为修改还是添加
      if (this.isUpdate) {  // 修改
        let {categoryId} = this
        result = await postUpdateCategory(categoryName.trim(),categoryId)  // 发送更新分类请求
      }else {  // 添加
        result = await postAddCategory(categoryName.trim())  // 发送添加分类请求
      }
      let {status,msg} = result
      if (status===0) {  // 如果请求成功
        message.success(this.isUpdate ? '更新分类成功' : '添加分类成功')
        this.props.updateCategoryListAsync()  // 重新获取分类列表
        this.setState({  // 关闭模态框
          visible: false,
        });
      }else {  // 如果请求出错,输出错误信息
        message.error(msg)
      }
    }
    categoryForm.resetFields()  // 重置表单清空输入
  };

  // 点击模态框中取消按钮回调
  handleCancel = () => {
    this.refs.categoryForm.resetFields()  // 重置表单清空输入
    this.setState({
      visible: false,
    });
  };

  // 模态框中Input组件输入类名的自定义校验逻辑
  categoryNameRule = (_,value) => {
    let {categoryArr} = this.props
    // 校验分类名必须输入
    if (!value.trim()) return Promise.reject('分类名不能为空或空格!')
    // 校验输入的分类名不能和已存在分类名重复
    let hasName = categoryArr.find(category => category.name===value.trim())
    if (hasName) return Promise.reject('分类名已存在!')

    return Promise.resolve()
  }


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
       //dataIndex: 'name' // 此项和render一起出现时,antd底层默认传入render的第一个参数不再是当前数据源对象,而是dataIndex在数据源对象对应的值
        render: (categoryObj)=>{  //render用于高级渲染，返回值展示到页面
          return  <Button 
                    type="link" 
                    onClick={()=>{this.showModal(categoryObj)}}
                  >
                    修改分类
                  </Button>
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
          title={this.isUpdate ? '修改分类' : '新增分类'}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="确定"
          cancelText="取消"
        >
          <Form 
            ref="categoryForm" 
            initialValues={{categoryName:this.categoryName}}  // 设置表单中输入框的初始值,保证数据的初始回显正确
          >
            <Form.Item
              name="categoryName"
              rules={[{validator: this.categoryNameRule}]}
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