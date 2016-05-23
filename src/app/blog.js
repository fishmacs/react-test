import { Route, IndexRoute, Link, IndexLink, Redirect } from 'react-router'
import { provideHooks } from 'redial'
import { connect } from 'react-redux'

import { apiFetch } from 'app/action/blog'
import styles from 'app/styles/blog.css' 

class Blog extends React.Component {
  render() {
    const pathname = this.props.location.pathname
    return (
      <div className={styles.blog_app}>
        <ul>
          <li><Link activeClassName='active' to='/blog/archives'>Archives</Link></li>
          <li><Link activeClassName='active' to='/blog/about'>About</Link></li>
          <li><Link activeClassName='active' to='/blog/signIn'>Sign in</Link></li>
          <li><Link activeClassName='active' to='/blog/signOut'>Sign out</Link></li>
        </ul>
        {React.cloneElement(this.props.children || <div/>, {key: pathname})}
      </div>
    )
  }
}

class About extends React.Component {
  render() {
    return (
      <div className={styles.about}>
        <h1>About author</h1>
      </div>
    )
  }
}

@provideHooks({
  // redux-promise-middleware return promise directly in 3.0.0,
  // instead of action.payload.promise in 2.x.x
  // so do not need dispatch(apiFetch()).payload.promise
  defer: ({dispatch}) => dispatch(apiFetch())
})
@connect(state => ({articles: state.article.data}))
class Archives extends React.Component {
  render() {
    return (
      <div>
        原创：<br/>
        <Original articles={this.props.articles} />
        转载：<br/>
        <Reproduce articles={this.props.articles} />
      </div>
    )
  }
}

class Original extends React.Component {
  render() {
    const { articles } = this.props
    return (
      <div className={styles.archives}>
        <ul>
          {articles.slice(0, 4).map((item, index) => {
            return (
              <li key={index}>
                <Link to={`/blog/article/${index}`}
                      query={{type: 'Original'}}
                      state={{title: item.title}}>
                  {item.title}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

class Reproduce extends React.Component {
  render() {
    const { articles } = this.props
    return (
      <div className={styles.archives}>
        <ul>{
            articles.slice(4, 8).map((item, index) => {
              return (
                <li key={index}>
                  <Link to={`/blog/article/${index}`}
                        query={{type: 'Reproduce'}}
                        state={{title: item.title}}
                        hash='#hash'>
                    {item.title}
                  </Link>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

class Article extends React.Component {
  render() {
    let id = this.props.params.id
    const location = this.props.location
    return (
      <div className={styles.article}>
        <h2>{location.state.title}</h2>
        <br/><br/>
        这是文档归档 {location.query.type} 类目下的第 {++id} 篇文章，欢迎您的访问！
      </div>
    )
  }
}

class SignIn extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const email = this.refs.name.value
    const pass = this.refs.pass.value
    if(pass !== 'password')
      return

    localStorage.setItem('login', 'true')
    const location = this.props.location
    let path = location.state && location.state.nextPathname
    if(!path)
      path = '/blog/about'
    this.props.history.replaceState(null, path)
  }

  render() {
    if(hasLogin())
      return (
        <p>你已经登录系统！
          <Link to='/blog/signOut'>点此退出</Link>
        </p>
      )
    return (
      <form onSubmit={this.handleSubmit}>
        <label><input ref='name' /></label><br/>
        <label><input ref='pass' /></label> (password)<br/>
        <button type='submit'>登录</button>
      </form>
    )
  }
}

class SignOut extends React.Component {
  constructor(props) {
    super(props)
    localStorage.setItem('login', 'false')
  }

  render() {
    return <p>已经退出！</p>
  }
}

function hasLogin() {
  return localStorage.getItem('login') === 'true'
}

function requireAuth(nextState, replaceState) {
  if(!hasLogin())
    replaceState({nextPathname: nextState.location.pathname}, '/blog/signIn')
}

export default (
  <Route path='blog' component={Blog}>
    <IndexRoute component={SignIn} />
    <Route path='signIn' component={SignIn} />
    <Route path='signOut' component={SignOut} />
    <Redirect from='archives' to='archives/posts' />
    <Route onEnter={requireAuth} path='archives' component={Archives}>
      <Route path='posts' components={{
               original: Original,
               reproduce: Reproduce
             }}
      />
    </Route>
    <Route path='article/:id' component={Article} />
    <Route path='about' component={About} />
  </Route>
)

