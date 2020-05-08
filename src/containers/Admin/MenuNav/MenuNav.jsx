import React, { Component } from 'react'

// 按需引入antd组件标签
import { Menu } from 'antd';

/* 
 从react-router-dom库中按需引入组件标签
 withRouter是react-router-dom提供的高阶组件,能够将一般组件包装成路由组件,使一般组件也可以拥有路由组件的props
*/
import {Link,withRouter} from 'react-router-dom'
// 因为用到redux所以引入connect方法
import {connect} from 'react-redux'
// 引入操作redux状态的action
import {saveTitleAction} from '@/redux/actions/title'

// 引入图片路径
import logo from '@/assets/images/logo.png'
// 加载样式文件
import './css/menuNav.less'
// 引入菜单配置文件
import menus from '@/config/menu_config'

const { SubMenu,Item } = Menu;

@connect(
  () => ({}),  //映射状态
  {saveTitleAction}  //映射操作状态的方法
)
@withRouter  // 使用装饰器语法调用高阶组件
class MenuNav extends Component {

  // 组件挂载完成的生命周期钩子
  componentDidMount(){
    this.initTitle(menus)
  }

  // 此函数为刷新时传递当前title的逻辑函数
  initTitle = (menusArr) => {
    let {pathname} = this.props.location  // 得到当前路径
    let currentKey = pathname.split('/').slice(-1)[0]  // 通过路径得到当前菜单的key值
    // 如果是初次登陆,路径最后为admin,因路由重定向到home路由,所以直接将当前key改为home以保证title能够初始显示
    if (currentKey==='admin') currentKey = 'home'
    // 利用递归找到和当前菜单匹配的菜单配置对象
    let currentObj = fun(menusArr)  
    function fun(menusArr) {  // 递归逻辑函数
      return menusArr.find(
        menusObj => {
          if (menusObj.children) {
            // debugger
            return fun(menusObj.children)
          }else{
            return menusObj.key === currentKey
          }
        }
      )
    }
    if (currentObj.children) {
      currentObj = currentObj.children.find(menusObj => menusObj.key === currentKey)
    }
    this.saveTitle(currentObj.title)
  }

  /* let currentObj = menusArr.find(menusObj => {  // 利用递归找到和当前菜单匹配的菜单配置对象
        
      if (menusObj.children) {
        this.initTitle(menusObj.children)
      }else{
        return menusObj.key === currentKey
      }
    
  }) */

  // 点击传递title数据的回调
  saveTitle = title => {
    this.props.saveTitleAction(title)
  }

  // 生成菜单的函数
  generateMenu = (receiveMenus) => {
    return receiveMenus.map(menu => {
      // 判断当前菜单下是否还有子菜单
      if (menu.children) { //如果有子菜单,递归调用此函数,传入子菜单
        return (
          <SubMenu key={menu.key} icon={<menu.icon />} title={menu.title}>
            {this.generateMenu(menu.children)}
          </SubMenu>
        )
      }else { //如果没有子菜单,return Item
        return (
          <Item key={menu.key}>
            <Link to={menu.path} onClick={() => {this.saveTitle(menu.title)}}>
              <menu.icon />{menu.title}
            </Link>
          </Item>
        )
      }
       
    })
    
  }

  render() {
    // 获取要刷新页面初始选中和展开的菜单(保证在当前页面刷新不会出现页面与选中不符的bug)
    let {pathname} = this.props.location  // 得到当前路径
    let keyArr = pathname.split('/')  // 初始展开的菜单
    let currentKeyArr = keyArr.slice(-1)  // 初始选中的菜单

    return (
      <div>
        <div className="nav-top">
          <h1>
            <img src={logo} alt="logo" />
            Staples Center
          </h1>
        </div>
        
        <Menu
          selectedKeys={currentKeyArr}  // 初始默认选中哪个菜单
          defaultOpenKeys={keyArr}  // 初始默认展开哪个菜单
          mode="inline"  // 展开模式: 垂直行内
          theme="dark"  // 主题:暗色
        >
          {this.generateMenu(menus)}
          
        </Menu>
      </div>
    );
  }
}

export default MenuNav