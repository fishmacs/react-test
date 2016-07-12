import ReactDOM from 'react-dom'
import {Router, browserHistory, createMemoryHistory} from 'react-router'
import { Provider } from 'react-redux'
import { trigger } from 'redial'

import { isBrowser } from 'app/utils'
import store from 'app/services/store'
import routes from 'app/routes'

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
          { routes }
        </Router>
      </Provider>
    )
  }
}

ReactDOM.render(<Main/>, document.getElementById('application-root'))

