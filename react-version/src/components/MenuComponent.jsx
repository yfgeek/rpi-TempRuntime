import React, { Component } from 'react'
import {Menu } from 'semantic-ui-react'
import DateSelectorComponent from './DateSelectorComponent.jsx';

export default class MenuComponent extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu secondary>
        <Menu.Item name ='树莓派温度湿度监控系统' />
        <Menu.Item name='主页' active={activeItem === '主页'} onClick={this.handleItemClick} />
        <Menu.Item name='设置' active={activeItem === '设置'} onClick={this.handleItemClick} />

        <Menu.Menu position='right'>
          <Menu.Item>
          <DateSelectorComponent />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}
