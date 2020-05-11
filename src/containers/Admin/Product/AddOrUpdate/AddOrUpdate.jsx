import React, { Component } from 'react'
import {connect} from 'react-redux'
// 从antd库中按需引入标签组件
import {Card,Button,Form,message,Input,Select,Upload, Modal} from 'antd'
import {LeftCircleOutlined,PlusOutlined} from '@ant-design/icons';

// 引入发送请求的API
import {postDeleteProductImg,postAddProduct,postUpdateProduct,getProductDetailById} from '@/api'
// 引入获取分类列表的异步action
import {updateCategoryListAsync} from '@/redux/actions/category'

// 引入子组件
import RichText from './RichText/RichText'
// 引入样式文件
import './css/addOrUpdate.less'
// 引入请求后台图片的统一路径
import {IMG_BASEURL} from '@/config'

const {Item} = Form
const {Option} = Select

// 将图片转为base64格式的函数
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

@connect(  // 使用装饰器语法调用connect高阶组件
  state => ({categoryList:state.categoryList}),  //映射状态
  {updateCategoryListAsync}  //映射操作状态的方法
)
class AddOrUpdate extends Component {

  state = {
    previewVisible: false,  // 预览框是否开启标识
    previewImage: '',   // 预览图片的url或base64
    previewTitle: '',  // 预览图片的标题(名字)
    fileList: [  // 上传的图片列表
      // {
      //   uid: '-4',  //必备属性，底层读取后作为react中的key去使用
      //   name: 'image.png',  //图片名
      //   status: 'done',  //图片状态，有：uploading done error removed中
      //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png', //图片地址
      // },
    ],
    isUpdate: false  // 标识当前是否是修改商品
  }

  // 组件挂载完成的生命周期钩子
  componentDidMount(){
    let {id} = this.props.match.params
    let {categoryList,updateCategoryListAsync} = this.props
    // 判断如果没请求过分类列表,则请求
    if (categoryList.length===0) {
      updateCategoryListAsync()
    }
    // 判断当前操作是否是修改商品
    if (id) {
      this._id = id  // 如果是,将id存到组件实例上,方便接下来使用
      this.setState({isUpdate: true})
      this.getCurrentProduct(id)
    }
  }

  // 获取当前商品信息数据的函数
  getCurrentProduct = async (id) => {
    let result = await getProductDetailById(id)
    let {status,msg,data} = result
    if (status===0) {
      this.setState({isUpdate: false})
      let {name,desc,price,categoryId,imgs,detail} = data
      // 实现表单普通数据回显
      this.refs.formInstance.setFieldsValue({name,desc,price,categoryId})
      // 实现商品图片回显
      let currentFileList = imgs.map((img,index) => {
        return {
          uid: index,
          name: img,
          status: 'done',
          url: IMG_BASEURL + img
        }
      })
      this.setState({fileList: currentFileList})
      // 实现商品详情数据回显
      this.richText.setDetail(detail)
    }else{
      message.error(msg)
    }
  }

	//预览窗关闭按钮的回调（程序员无需修改）
  handleCancel = () => this.setState({ previewVisible: false });

	//点击预览按钮的回调，("小眼睛按钮"，程序员无需修改)
  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  //重要！！！！！图片状态发生改变的回调，在antd照片墙组件中每一个上传的图片都是有状态的。
  handleChange = async ({file,fileList}) => {
    const {status} = file
    if (status==="done") {
      const {status,data,msg} = file.response
      if (status===0) {
        message.success('上传商品图片成功!')
        const {name ,url} = data
        fileList[fileList.length-1].name = name
        fileList[fileList.length-1].url = url
      }else {
        message.error(msg)
      }
    }else if(status==="removed") {
      let result = await postDeleteProductImg(file.name)
      const {status,msg} = result
      if (status===0) {
        message.success('删除商品图片成功!')
      }else {
        message.error(msg)
      }
    }
    // console.log(file)
    // console.log(file.response)
    this.setState({ fileList: fileList })
  }

  // 表单提交的回调
  onFinish = async values => {
    let {richText,_id,state:{fileList}} = this
    // 得到上传商品图片名字所组成的数组
    let imgs = fileList.reduce((preArr,item)=>{
      preArr.push(item.name)
      return preArr
    },[])
    // 得到文本编辑器中编辑的商品详情数据
    let detail = richText.getDetail()
    // 定义接收请求响应的变量
    let result  
    // 判断当前操作是否是修改商品
    if (_id) {  // 修改商品
      result = await postUpdateProduct({...values,imgs,detail,_id})
    }else {  // 添加商品
      result = await postAddProduct({...values,imgs,detail})
    }
    let {status,msg} = result
    if (status===0) {
      message.success(_id ? '修改商品成功' : '添加商品成功')
      // 跳转到商品管理路由
      this.props.history.replace('/admin/prod_about/product')
    }else {
      message.error(msg)
    }
  }

  render() {
    const { previewVisible, previewImage, fileList, previewTitle,isUpdate } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    let {id} = this.props.match.params
    let {categoryList,history:{goBack}} = this.props
    return (
      <Card 
        title={
          <div>
            <Button type='link' onClick={goBack}><LeftCircleOutlined /></Button>
            <span style={{color: '#6c6c6c',fontSize: '18px'}}>{id ? '商品修改' : '商品添加'}</span>
          </div>
        }
        loading={isUpdate}
      >
        <Form 
          onFinish={this.onFinish}  // 表单提价的回调
          labelCol={{span:3}}
          wrapperCol={{span:8}}
          initialValues={{categoryId:''}}
          ref="formInstance"
        >
          <Item
            name="name"
            rules={[
              {required: true, message: '请输入商品名称'}
            ]}
            label="商品名称"  // label标签的内容
            className="add-item"
          >
            <Input 
              placeholder="请输入商品名称"
            />
          </Item>
          <Item
            name="desc"
            rules={[
              {required: true, message: '请输入商品描述'}
            ]}
            label="商品描述"  // label标签的内容
            className="add-item"
          >
            <Input 
              placeholder="请输入商品描述"
            />
          </Item>
          <Item
            name="price"
            rules={[
              {required: true, message: '请输入商品价格'}
            ]}
            label="商品价格"  // label标签的内容
            className="add-item"
          >
            <Input 
              placeholder="请输入商品价格"
              addonAfter="RMB"
              prefix="￥"
              type="number"  // 设置输入框类型为数字,得到焦点时,出现加减小箭头
            />
          </Item>
          <Item
            name="categoryId"
            rules={[
              {required: true, message: '请选择一个分类'}
            ]}
            label="商品分类"  // label标签的内容
            className="add-item"
          >
            <Select>
              <Option value="">请选择分类</Option>
              {
                categoryList.map(category => <Option key={category._id} value={category._id}>{category.name}</Option>)
              }
            </Select>
          </Item>
          <Item
            // name="imgs"
            label="商品图片"  // label标签的内容
            className="add-item"
          >
            <Upload
              name="image"  // 发到后台的文件参数名
              action="/api/manage/img/upload"  // 上传的地址
              listType="picture-card"  // 类型:照片墙类型
              fileList={fileList}  // 上传的图片列表
              onPreview={this.handlePreview}  // 点击预览图片回调
              onChange={this.handleChange}  // 图片上传状态改变的回调
            >
              {fileList.length >= 4 ? null : uploadButton} 
            </Upload>
            <Modal
              visible={previewVisible}
              title={previewTitle}
              footer={null}
              onCancel={this.handleCancel}
            >
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </Item>
          <Item
            label="商品详情"  // label标签的内容
            className="add-item"
            wrapperCol={{span:13}}
          >
            <RichText ref={(node)=>{this.richText=node}} />
          </Item>
          <Item>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Item>
        </Form>
      </Card>
    )
  }
}
export default AddOrUpdate