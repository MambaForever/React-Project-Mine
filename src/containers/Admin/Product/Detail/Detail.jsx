import React, { Component } from 'react'
import {connect} from 'react-redux'

// 引入发送请求的API
import {getProductDetailById} from '@/api'

// 引入获取分类列表的异步action
import {updateCategoryListAsync} from '@/redux/actions/category'

// 从antd库中按需引入标签组件
import {Card,Button,List,message} from 'antd'
import { LeftCircleOutlined } from '@ant-design/icons';

// 引入请求后台图片的统一路径
import {IMG_BASEURL} from '@/config'
// 引入样式文件
import './css/detail.less'

@connect(
  state => ({categoryList:state.categoryList}),  //映射状态
  {updateCategoryListAsync}  //映射操作状态的方法
)
class Detail extends Component {

  state = {
    productDetail: {imgs:[]},  // 商品详情数据
  }

  // 组件挂载完成的生命周期钩子
  async componentDidMount(){
    let {id} = this.props.match.params
    let {categoryList,updateCategoryListAsync} = this.props
    if (categoryList.length===0) updateCategoryListAsync()  // 如果没有请求过分类列表,才请求
    let result = await getProductDetailById(id)
    let {status,data,msg} = result
    if (status===0) {
      this.setState({productDetail: data})
    }else {
      message.error(msg)
    }
  }

  
  render() {
    let {imgs, name, desc, price, categoryId, detail} = this.state.productDetail
    let {categoryList,history:{goBack}} = this.props
    return (
      <div>
        <Card 
          title={
            <div>
              <Button type='link' onClick={goBack}><LeftCircleOutlined /></Button>
              <span style={{color: '#6c6c6c',fontSize: '18px'}}>商品详情</span>
            </div>
          }
        >
          <List className='detail-list'>
            <List.Item>
              <span>商品名称:</span>
              <strong>{name}</strong>
            </List.Item>
            <List.Item>
              <span>商品描述:</span>
              <strong>{desc}</strong>
            </List.Item>
            <List.Item>
              <span>商品价格:</span>
              <strong>{'￥'+price}</strong>
            </List.Item>
            <List.Item>
              <span>所属分类:</span>
              <strong>
                {
                 categoryList.find(categoryObj => categoryObj._id===categoryId) ? categoryList.find(categoryObj => categoryObj._id===categoryId).name : ''
                }
              </strong>
            </List.Item>
            <List.Item>
              <span>商品图片:</span>
              {imgs.map(img => <img src={IMG_BASEURL + img} alt="detailImg" key={img} />)}
            </List.Item>
            <List.Item>
              <span>商品详情:</span>
              <strong dangerouslySetInnerHTML={{__html:detail}}></strong>
            </List.Item>
          </List>
        </Card>
      </div>
    )
  }
}
export default Detail