import {connect} from 'react-redux'
import {Route} from 'react-router'

import {requestPosts, selectSubReddit, invalidateSubReddit} from 'app/action/reddit'

@connect(
  state => {
    const {selectedSubReddit, postsBySubReddit} = state
    const {isFetching, lastUpdated, items: posts} =
            postsBySubReddit[selectedSubReddit] || {
              isFetching: true,
              items: []
            }
    return {
      selectedSubReddit,
      posts,
      isFetching,
      lastUpdated
    }
  }
)
class RedditApp extends React.Component {
  componentDidMount() {
    const {dispatch, selectedSubReddit} = this.props
    dispatch(requestPosts(selectedSubReddit))
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.selectedSubReddit !== this.props.selectedSubReddit) {
      const {dispatch, selectedSubReddit} = nextProps
      dispatch(requestPosts(selectedSubReddit))
    }
  }

  handleChange = (nextSubReddit) => {
    this.props.dispatch(selectSubReddit(nextSubReddit))
  }

  handleRefreshClick = e => {
    e.preventDefault()
    const {dispatch, selectedSubReddit} = this.props
    dispatch(invalidateSubReddit(selectedSubReddit))
    dispatch(requestPosts(selectedSubReddit))
  }

  render() {
    const {selectedSubReddit, posts, isFetching, lastUpdated} = this.props
    return (
      <div>
        <Picker value={selectedSubReddit}
                onChange={this.handleChange}
                options={['reactjs', 'frontend']} />
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>
          }
          {!isFetching &&
              <a href='#' onClick={this.handleRefreshClick.bind(this)}>
              Refresh
            </a>
          }
        </p>
        {isFetching && posts.length === 0 &&
          <h2>Loading...</h2>
        }
        {!isFetching && posts.length === 0 &&
          <h2>Empty.</h2>
        }
        {posts.length > 0 &&
          <div style={{opacity: isFetching ? 0.5 : 1}}>
            <Posts posts={posts} />
          </div>
        }
      </div>
    )
  }
}

export default (
  <Route path='reddit' component={RedditApp} />
)

function Picker({value, onChange, options}) {
  return (
    <span>
      <h1>{value}</h1>
      <select onChange={e => onChange(e.target.value)} value={value}>
        {options.map(option =>
          <option value={option} key={option}>
            {option}
          </option>)
        }
      </select>
    </span>
  )
}

function Posts({posts}) {
  return (
    <ul>
      {posts.map((post, i) =>
        <li key={i}>{post.title}</li>
      )}
    </ul>
  )
}
