import { Router, IndexLink, Link, browserHistory, createMemoryHistory } from 'react-router'
import { Provider } from 'react-redux'
import { trigger } from 'redial'

import { isBrowser } from 'app/utils'
import routes from 'app/routes'
import store from 'app/services/store'
import styles from 'app/styles/demo.css'

const history = isBrowser ? browserHistory : createMemoryHistory()

function routeLocalsTrigger(event) {
  return function() {
    const dispatch = store.dispatch
    const { components, location, params } = this.state
    trigger(event, components, { dispatch, location, params })
  }
}

const onRouteUpdate = routeLocalsTrigger('defer')

export class Main extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history} onUpdate={onRouteUpdate}>
          { routes() }
        </Router>
      </Provider>
    )
  }
}

export class Demo extends React.Component {
  render() {
    return (
      <div>
        <nav className={styles.nav}>
          <IndexLink to='/'>
            Home
          </IndexLink>
          <Link to='/router'>
            Router
          </Link>
          <Link to='/blog'>Blog</Link>
          <Link to='/ryf'>Ruan</Link>
          <Link to='/westfall'>Westfall</Link>
          <Link to='/gallery'>Image Gallery</Link>
          <Link to='/todo'>Todo List</Link>
          <Link to='/reddit'>Reddit</Link>
        </nav>
        { this.props.children }
      </div>
    )
  }
}
