import React, { Component } from 'react'
import { Input, Menu } from 'semantic-ui-react'
import { Link, Route } from 'react-router-dom'
import logo from '../../logo.svg';
import './Menu.css'

const MenuItem = ({ name, to, activeOnlyWhenExact }) => (
  <Route
    path={to}
    exact={activeOnlyWhenExact}
    children={({ match }) => (
      <Menu.Item name={name} as={Link} to={to} active={match ? true : false} />
    )}
  />
);

export default class Menus extends Component {
  render() {
    let isHomePage =  window.location.pathname === '/'
    return (
      <Menu inverted stackable>
        <Menu.Item>
          <img src={logo} className="App-logo" alt="logo" style={{ width: 30, height: 20 }}/>
        </Menu.Item>
        <MenuItem name="home" to="/" activeOnlyWhenExact />
        <MenuItem name="about" to="/about" />
        <MenuItem name="topics" to="/topics" />
        {!isHomePage && <Menu.Menu position='right'>
          <Menu.Item>
            <Input icon='search' placeholder='Search...' />
          </Menu.Item>
        </Menu.Menu>}
      </Menu>
    )
  }
}
