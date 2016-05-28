import {connect} from 'react-redux'

import {fetchUserList, fetchWidgetList} from 'app/action/westfall'
import store from 'app/services/store'
import styles from 'app/styles/westfall.css'

@connect(state => {
  const searchType = state.search.searchType

  if(searchType === 'user')
    var totalResults = state.user.data.length
  else if(searchType === 'widget')
    totalResults = state.widget.data.length
  else
    totalResults = 0

  return {
    searchType,
    title: state.search.title,
    totalResults
  }
})
export class SearchLayout extends React.Component {
  render() {
    const props = this.props
    return (
      <div className={styles.search}>
        <header className={styles['search-header']}>
          {props.title}
          <SearchFormContainer searchType={props.searchType} />
        </header>
        <div className={styles['search-results']}>
          {props.children}
        </div>
        <footer className={styles['search-footer']}>
          {props.totalResults} Results
        </footer>
      </div>
    )
  }
}

class SearchFormContainer extends React.Component {
  search = (event) => {
    event.preventDefault()
    const query = this.refs.child.getQuery()

    const searchType = this.props.searchType
    if(searchType === 'user') {
      store.dispatch(fetchUserList(query))
    } else if(searchType === 'widget') {
      store.dispatch(fetchWidgetList(query))
    }
  }

  render() {
    return <SearchForm search={this.search} ref='child' />
  }
}

class SearchForm extends React.Component {
  getQuery = () => this.refs.search.value

  render() {
    return (
      <form onSubmit={this.props.search} className={styles.search}>
        <input type='text' ref='search' placeholder='Search' />
        <button>Search</button>
      </form>
    )
  }
}
