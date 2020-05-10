import React, { Component } from 'react'
// 从antd库中按需引入组件标签
import { Card,Table,Button,Select,Input,message  } from 'antd';
// 在antd中按需引入图标字体
import {PlusCircleOutlined,SearchOutlined} from '@ant-design/icons';

// 引入发送请求的API
import {getSqlProductList,getSearchProduct,postUpdateStatusOfProduct} from '@/api'
// 引入相关配置常量
import {PAGE_SIZE} from '@/config'

const { Option } = Select

export default class Product extends Component {

  state = {
    productList: [],  // 商品列表数据
    total: 0,  // 商品数据总数
    searchType: 'productName ',  // 搜索的类型(按名称还是描述搜索),默认是名字
    keyword: '',  // 搜索关键字
    pageNum: 1,  // 当前是第几页
    // isSearch: false,  // 是否为搜索请求
  }

  // 组件挂载完成的生命周期钩子
  componentDidMount(){
    // 初始加载时获取商品数据
    this.getProductList()
  }

  // 获取商品列表的函数
  getProductList = async (pageNum=1) => {
    let {searchType,keyword} = this.state
    // 定义变量接收请求返回值
    let result
    // 判断当前是否为搜索操作
    if (this.isSearch) {  // 为搜索请求
      result = await getSearchProduct({pageNum,pageSize:PAGE_SIZE,[searchType]: keyword})
    }else {  // 为普通请求
      result = await getSqlProductList({pageNum,pageSize:PAGE_SIZE})
    }
    let {status,data,msg} = result
    let currentPageNum = data.pageNum
    let {list,total} = data
    if (status===0) {
      this.setState(
        {
          productList: list,
          total,
          pageNum: currentPageNum
        }
      )
    }else {
      message.error(msg)
    }
  }

  // 页码改变的回调函数
  pageChange = (pageNum) => {
    this.getProductList(pageNum)
  }

  // 点击搜索按钮的回调
  search = () => {
    this.isSearch = true  // 标识当前动作为搜索
    // this.setState({isSearch: true})
    this.getProductList()
  }

  // 点击上架/下架更新商品状态的回调
  updateStatus = async (currentStatus,id) => {
    // 将状态改成将要更新的状态便于请求携带参数
    currentStatus = currentStatus===1 ? 2 : 1
    let result = await postUpdateStatusOfProduct({status:currentStatus,productId:id})
    let {status,msg} = result
    if (status===0) {  // 更新状态成功
      message.success(currentStatus===1 ? '上架商品成功' : '下架商品成功')
      this.getProductList(this.state.pageNum)
    }else {  // 更新状态失败
      message.error(msg)
    }
  }


  render() {
    let {productList,pageNum,total} = this.state
    let {push} = this.props.history
    // 数据源数组
    const dataSource = productList
    
    // 列配置数组
    const columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '商品描述',
        dataIndex: 'desc',
        key: 'desc',
      },
      {
        title: '价格',
        dataIndex: 'price',
        align: 'center',
        key: 'price',
        render(price){
          return '￥'+price
        }
      },
      {
        title: '状态',
        // dataIndex: 'status',  // 开启此属性render的第一个参数将是此属性在数据源中对应的值,关闭则为当前数据源对象
        align: 'center',
        key: 'status',
        render: productObj => {
          let {status,_id} = productObj
          return (
            <div>
              <Button 
                type='primary' 
                danger={status===1 ? true : false}
                onClick={() => {this.updateStatus(status,_id)}}
              >
                {status===1 ? '下架' : '上架'}
              </Button> 
              <br/>
              <span>{status===1 ? '在售' : '已停售'}</span>
            </div>
          )
        }
      },
      {
        title: '操作',
        dataIndex: '_id',
        key: 'handle',
        align: 'center',
        render: _id => {
          return (
            <div>
              <Button 
                type='link' 
                onClick={() => {push(`/admin/prod_about/product/detail/${_id}`)}}
              >
                详情
              </Button> 
              <br/>
              <Button 
                type='link' 
                onClick={() => {push(`/admin/prod_about/product/update/${_id}`)}}
              >
                修改
              </Button>
            </div>
          )
        }
      },
    ]

    return (
      <div>
        <Card 
          title={
            <div>
              <Select defaultValue="productName " 
                onChange={searchType => {this.setState({searchType})}}  // 将此Select组件变为受控组件
              > 
                <Option value="productName ">按名称搜索</Option>
                <Option value="productDesc">按描述搜索</Option>
              </Select>
              <Input 
                placeholder="请输入搜索关键字" 
                style={{width:'24%',margin:'0 8px'}} 
                allowClear  // 输入内容后input框末尾显示清空内容的图标
                onChange={(event) => {this.setState({keyword: event.target.value})}}  // 将此Input组件变为受控组件
              />
              <Button type='primary' onClick={this.search}><SearchOutlined />搜索</Button>
            </div>
          } 
          extra={
          <Button 
            type='primary'
            onClick={() => {push('/admin/prod_about/product/add')}} // 编程式路由跳转到add路由
          >
            <PlusCircleOutlined />添加商品
          </Button>} 
        >
          <Table 
            dataSource={dataSource}  // 数据源配置
            columns={columns}  // 列配置
            bordered  // 是否展示外边框和列边框
            rowKey='_id'  // 指定唯一值(key)在数据源中的对应项
            loading={productList.length>0 ? false : true}   // 是否在数据加载时显示loading效果
            pagination={  // 分页器的配置对象
              {
                pageSize: PAGE_SIZE,  // 每页数据条数
                total,   // 数据总数
                current: pageNum,  // 当前是第几页
                onChange: this.pageChange  // 页码改变的回调函数
              }
            } 
          />
        </Card>
      </div>
    )
  }
}
