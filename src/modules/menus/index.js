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
const RightMenu = ({ name, to, activeOnlyWhenExact }) => (
  <Route
    path={to}
    exact={activeOnlyWhenExact}
    children={({ match, history }) => (
      <Menu.Menu position='right'>
        <Menu.Item>
          <Input icon='search' placeholder='Search...' onKeyPress={keyPress(history)} />
        </Menu.Item>
      </Menu.Menu>
    )}
  />
);
const keyPress = history => e => {
  if (e.charCode === 13 && e.target.value.length > 0) {
    let encodeUri = encodeURIComponent(e.target.value);
    history.push('/search/?q=' + encodeUri);
    e.target.value = '';
  } else {
    e.target.focus();
  }
}

export default class Menus extends Component {
  render() {
    return (
      <Menu inverted stackable>
        <Menu.Item>
          <img src={logo} className="App-logo" alt="logo" style={{ width: 30, height: 20 }}/>
        </Menu.Item>
        <MenuItem name="home" to="/" activeOnlyWhenExact />
        <MenuItem name="about" to="/about" />
        <MenuItem name="topics" to="/topics" />
        <RightMenu />
      </Menu>
    )
  }
}
