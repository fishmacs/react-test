import { Route, IndexRoute, Link } from 'react-router'

export class RouteTest extends React.Component {
  render() {
    return (
      <div>
        <h3>Route Test</h3>
        <ul>
          <li><Link to='/router/inbox'>Inbox</Link></li>
          <li><Link to='/router/about'>About</Link></li>
        </ul>
        { this.props.children }
      </div>
    )
  }
}

export class Dashboard extends React.Component {
  render() {
    return <div>Welcome to the app!</div>
  }
}

export class About extends React.Component {
  render() {
    return <h3>About</h3>
  }
}

export class Message extends React.Component {
  render() {
    return <h3>Message {this.props.params.id}</h3>
  }
}

export class Inbox extends React.Component {
  render() {
    return (
      <div>
        <h2>Inbox</h2>
        { this.props.children || 'Welcome to you inbox' }
      </div>
    )
  }
}

export default (
  <Route path='router' component={RouteTest}>
    <IndexRoute component={Dashboard} />
    <Route path='about' component={About} />
    <Route path='inbox' component={Inbox}>
      <Route path='/message/:id' component={Message} />
    </Route>
  </Route>
)

