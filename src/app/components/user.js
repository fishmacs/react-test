import {connect} from 'react-redux'
import {Link} from 'react-router'

import {fetchUserList, deleteUser, getUserProfile, loadSearchLayout} from 'app/action/westfall'
import store from 'app/services/store'
import styles from 'app/styles/westfall.css'

@connect(state => ({users: state.user.data}))
export class UserListContainer extends React.Component {
  componentDidMount() {
    store.dispatch(fetchUserList())
    store.dispatch(loadSearchLayout('user', 'User Results'))
  }

  deleteUser(userId) {
    store.dispatch(deleteUser(userId))
  }

  render() {
    return <UserList users={this.props.users} deleteUser={this.deleteUser} />
  }
}

function UserList(props) {
  return (
    <div className={styles['data-list']}>
      {props.users.map(user => {
        return (
          <div key={user.id} className={styles['data-list-item']}>
            <div className={styles.details}>
              <Link to={'/westfall/users/' + user.id}>
                {user.name}
              </Link>
            </div>
            <div className={styles.controls}>
              <button onClick={props.deleteUser.bind(null, user.id)} className={styles.delete}>
                Delete
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

@connect(state => ({profile: state.profile.data}))
export class UserProfileContainer extends React.Component {
  componentDidMount() {
    store.dispatch(getUserProfile(this.props.params.id))
  }

  render() {
    return <UserProfile {...this.props.profile} />
  }
}

function UserProfile(props) {
  return (
    <div className={styles['user-profile']}>
      <img src={props.imageUrl} />
      <div className={styles.details}>
        <h1>{props.name}</h1>
        <a href={'http://twitter.com/' + props.twitter}>
          @{props.twitter}
        </a>
        <p>Works on <strong>{props.worksOn}</strong></p>
        <h3>Github Repos:</h3>
        <ul className={styles.repos}>
          {props.repos.map(repo => (
            <li key={repo.id}>
              <a href={repo.html_url}>
                {repo.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
