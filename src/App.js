import React, { Component } from 'react';
import { Container } from 'semantic-ui-react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'
import NewsList from './modules/news/NewsList'
import SourceList from './modules/news/SourceList'
import Search from './modules/news/Search'
import Menu from './modules/menus'

const About = () => (
  <div>
    <h2>About</h2>
    <p>Resource: <a href="https://newsapi.org">newsapi.org</a></p>
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
  render() {
    return (
      <Router>
        <Container>
          <Menu />
          <Switch>
            <Route exact path="/" component={SourceList}/>
            <Route path="/source/:sourceId" component={NewsList}/>
            <Route path="/search" component={Search}/>
            <Route path="/about" component={About}/>
            <Route path="/topics" component={Topics}/>
          </Switch>
        </Container>
      </Router>
    );
  }
}

export default App;
