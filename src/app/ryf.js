import { Route, Link } from 'react-router'
import {get} from 'axios'

function RyfDemo(props) {
  return (
    <div>
      <h3>Ruan YiFeng demo</h3>
      <ul>
        <li><Link to='/ryf/demo5'>Demo5</Link></li>
        <li><Link to='/ryf/demo9'>Demo9</Link></li>
        <li><Link to='/ryf/demo10'>Demo10</Link></li>
        <li><Link to='/ryf/demo12'>Demo12</Link></li>
      </ul>
      { props.children }
    </div>
  )
}

// must be a class, otherwise no "this"
class NoteList extends React.Component {
  render() {
    return (
      <ol>
        {
          React.Children.map(this.props.children, (child) => <li>{child}</li>)
        }
      </ol>
    )
  }
}

function Demo5() {
  return (
    <NoteList>
      <span>hello</span>
      <span>world</span>
    </NoteList>
  )
}

class Demo9 extends React.Component {
  state = {
    value: 'Hello!'
  }

  handleChange = (e) => {
    this.setState({value: e.target.value})
  }

  render() {
    const value = this.state.value
    return (
      <div>
        <input type="text" value={value} onChange={this.handleChange} />
        <p>{value}</p>
      </div>
    )
  }
}

class Demo10 extends React.Component {
  state = {opacity: 1.0}

  // also can be constructor
  componentDidMount() {
    this.timer = setInterval(() => {
      let opacity = this.state.opacity - 0.05
      if(opacity < 0.1)
        opacity = 1.0
      this.setState({opacity: opacity})
    }, 100)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    return (
      <div style={{opacity: this.state.opacity}}>
        Hello {this.props.name}
      </div>
    )
  }
}

class Demo12 extends React.Component {
  state = {
    loading: true,
    error: null,
    data: null
  }

  componentDidMount() {
    get('https://api.github.com/search/repositories?q=javascript&sort=stars')
      .then(val => this.setState({
        loading: false,
        data: val.data
      }))
      .catch(err => this.setState({
        loading: false,
        error: err
      }))
  }

  render() {
    if(this.state.loading) {
      return <span>Loading...</span>
    } else if(this.state.error != null) {
      return <span>Error: {this.state.error.message}</span>
    } else {
      const repos = this.state.data.items
      const repoList = repos.map((repo, index) => (
        <li key={index}>
          <a href={repo.html_url}>{repo.name}</a>
          {repo.stargazers_count} starts<br/>
          {repo.description}
        </li>
      ))
      return (
        <main>
          <h1>Most Popular JavaScript Projects in Github</h1>
          <ol>{repoList}</ol>
        </main>
      )
    }
  }
}

export default (
  <Route path='ryf' component={RyfDemo}>
    <Route path='demo5' component={Demo5} />
    <Route path='demo9' component={Demo9} />
    <Route path='demo10' component={Demo10} />
    <Route path='demo12' component={Demo12} />
  </Route>
)
