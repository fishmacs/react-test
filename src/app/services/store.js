import reducers from 'app/reducers'
import storeMaker from 'app/services/storeMaker'
import {middlewares, saga} from 'app/services/middleware'
import {watchLoad} from 'app/sagas'
import {isBrowser} from 'app/utils'

const store = storeMaker(middlewares)(
  reducers,
  isBrowser ? window.__INITIAL_STATE__ : {}
)

saga.run(watchLoad)

export default store

if(module.hot) {
  module.hot.accept('app/reducers', () => {
    store.replaceReducer(require('app/reducers'))
  })
}
