// 向后台发送请求的函数库

// 引入jsonp库
import jsonp from 'jsonp'
// 按需引入antd组件标签
import {message} from 'antd'

// 引入二次封装后的axios
import ajax from './ajax'
// 引入一些重要配置常量
import {AK_VALUE,CITY} from '@/config'


// 通过jsonp方式发送ajax请求天气数据
let getJsonpWeather = () => {
  // 定义请求天气数据的url路径  http://api.map.baidu.com/telematics/v3/weather?location=xxx&output=json&ak=3p49MVra6urFRGOT9s8UBWr2
  let url = `http://api.map.baidu.com/telematics/v3/weather?location=${CITY}&output=json&ak=${AK_VALUE}`
  
  // 返回promise,在promise中发送异步请求
  return new Promise((resolve) => {
    // 定义获取天气数据的回调
    let getWeather = (err,data) => {
      if (data) {
        resolve(data.results)
      }else {
        message.error('获取当前天气信息失败!',1.5)
      }
    }
    // 通过jsonp发送请求
    jsonp(url,{timeout:3000},getWeather)
  })
}


// 向后台发送登录请求
let postLogin = userInfo => ajax.post('/login',userInfo)
// 向后台发送获取分类列表请求
let getCategoryList = () => ajax.get('/manage/category/list')
// 向后台发送添加分类项的请求
let postAddCategory = categoryName => ajax.post('/manage/category/add',{categoryName})
// 向后台发送更新分类项的请求
let postUpdateCategory = (categoryName,categoryId) => ajax.post('/manage/category/update',{categoryName,categoryId}) 
// 向后台发送获取商品列表(分页)的请求(携带query参数)
let getSqlProductList = pageParamsObj => ajax.get('/manage/product/list',{params:pageParamsObj})
// 向后台发送搜索商品列表(分页)的请求(携带query参数)
let getSearchProduct = paramsObj => ajax.get('/manage/product/search',{params:paramsObj})
// 向后台发送商品下架/上架的请求
let postUpdateStatusOfProduct = params => ajax.post('/manage/product/updateStatus',params)
// 向后台发送根据商品Id获取商品详情的请求
let getProductDetailById = productId => ajax.get('/manage/product/info',{params:{productId}})
// 向后台发送删除商品图片请求
let postDeleteProductImg = name => ajax.post('/manage/img/delete',{name})



// 向外暴露发送请求的函数
export {
        postLogin,getJsonpWeather,getCategoryList,postAddCategory,postUpdateCategory,getSqlProductList,getSearchProduct,
        postUpdateStatusOfProduct,getProductDetailById,postDeleteProductImg,
       }


