import React, { Component } from 'react';
import { Container, Input, Menu } from 'semantic-ui-react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import NewsList from './modules/news/NewsList'
import logo from './logo.svg';
import './App.css';

const About = () => (
  <div>
    <h2>About</h2>
  </div>
)

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route path={`${match.path}/:topicId`} component={Topic}/>
    <Route exact path={match.path} render={() => (
      <h3>Please select a topic.</h3>
    )}/>
  </div>
)

class App extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Router>
        <Container>
          <Menu inverted stackable>
            <Menu.Item>
              <img src={logo} className="App-logo" alt="logo" style={{ width: 30, height: 20 }}/>
            </Menu.Item>
            <Menu.Item name="home" as={Link} to="/" active={activeItem === 'home'} onClick={this.handleItemClick}>
              Home
            </Menu.Item>
            <Menu.Item name="about" as={Link} to="/about" active={activeItem === 'about'} onClick={this.handleItemClick}>
              About
            </Menu.Item>
            <Menu.Item name="topics" as={Link} to="/topics" active={activeItem === 'topics'} onClick={this.handleItemClick}>
              Topics
            </Menu.Item>
            <Menu.Menu position='right'>
              <Menu.Item>
                <Input icon='search' placeholder='Search...' />
              </Menu.Item>
            </Menu.Menu>
          </Menu>

          <Route exact path="/" component={NewsList}/>
          <Route path="/about" component={About}/>
          <Route path="/topics" component={Topics}/>
        </Container>
      </Router>
    );
  }
}

export default App;
