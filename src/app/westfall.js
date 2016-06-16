import { Route, IndexRoute, Link, IndexLink } from 'react-router'

import {SearchLayout} from 'app/components/search'
import {UserListContainer, UserProfileContainer} from 'app/components/user'
import {WidgetListContainer} from 'app/components/widget'
import styles, {active} from 'app/styles/westfall.css'

export default (
  <Route path='/westfall' component={MainLayout}>
    <IndexRoute component={Home} />
    <Route path='users'>
      <Route component={SearchLayout}>
        <IndexRoute component={UserListContainer} />
      </Route>
      <Route path=':id' component={UserProfileContainer} />
    </Route>
    <Route path='widgets'>
      <Route component={SearchLayout}>
        <IndexRoute component={WidgetListContainer} />
      </Route>
    </Route>
  </Route>
)

function MainLayout(props) {
  // IndexLink because Home is IndexRoute, which always active if just Link
  return (
    <div className={styles.app}>
      <header className={styles['primary-header']}></header>
      <aside className={styles['primary-aside']}>
        <ul>
          <li><IndexLink to='/westfall' activeClassName={active}>Home</IndexLink></li>
          <li><Link to='/westfall/users' activeClassName={active}>Users</Link></li>
          <li><Link to='/westfall/widgets' activeClassName={active}>Widgets</Link></li>
        </ul>
      </aside>
      <main>
        {props.children}
      </main>
    </div>
  )
}

function Home() {
  return (
    <div className={styles['home-page']}>
      <h1>The app is now using Redux</h1>
      <p>
        While the <a href='#'>CSS-Tricks article</a> for
        this guide covers an explanation of <strong>Redux</strong>, there
        are still many implementation details in this code that the article
        doesn't cover. For a better understanding of those details, see
        the <a href='https://github.com/bradwestfall/CSS-Tricks-React-Series'>Github documentation</a> for
        this guide
      </p>
    </div>
  )
}
