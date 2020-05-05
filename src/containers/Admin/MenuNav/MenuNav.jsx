import React, { Component } from 'react'

// 按需引入antd组件标签
import { Menu } from 'antd';

// 引入图片路径
import logo from '@/assets/images/logo.png'
// 加载样式文件
import './css/menuNav.less'
// 引入菜单配置文件
import menus from '@/config/menu_config'

const { SubMenu,Item } = Menu;


export default class MenuNav extends Component {

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
          <Item key={menu.key} icon={<menu.icon />}>
            {menu.title}
          </Item>
        )
      }
       
    })
    
  }

  render() {
    return (
      <div>
        <div className="nav-top">
          <h1>
            <img src={logo} alt="logo" />
            Staples Center
          </h1>
        </div>
        
        <Menu
          defaultSelectedKeys={['home']}  // 初始默认选中哪个菜单
          defaultOpenKeys={['sub1']}  // 初始默认展开哪个菜单
          mode="inline"  // 展开模式: 垂直行内
          theme="dark"  // 主题:暗色
        >
          {this.generateMenu(menus)}
          
        </Menu>
      </div>
    );
  }
}
