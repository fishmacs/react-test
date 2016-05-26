import {Route, Link} from 'react-router'
import { connect } from 'react-redux'
import store from 'app/services/store'
import {get} from 'axios'

function fetchSecretSauce() {
  return get('https://www.google.com/search?q=secret+sauce')
}

function makeASandwich(forPerson, secretSauce) {
  return {
    type: 'MAKE_SANDWICH',
    forPerson,
    secretSauce
  }
}

function apologize(fromPerson, toPerson, error) {
  return {
    type: 'APOLOGIZE',
    fromPerson,
    toPerson,
    error
  }
}

function withdrawMoney(amount) {
  return {
    type: 'WITHDRAW',
    amount
  }
}

function makeASandwichWithSecretSauce(forPerson) {
  return function(dispatch) {
    return fetchSecretSauce()
      .then(sauce => dispatch(makeASandwich(forPerson, sauce)))
      .then(err => dispatch(apologize('The Sandwich Shop', forPerson, error)))
  }
}

function makeSandwichesForEverybody() {
  return function(dispatch, getState) {
    if (!getState().sandwiches.isShopOpen) {
      return Promise.resolve()
    }
    return dispatch(makeASandwichWithSecretSauce('My Grandma'))
      .then(() => Promise.all([
        dispatch(makeASandwichWithSecretSauce('Me')),
        dispatch(makeASandwichWithSecretSauce('My wife'))
      ]))
      .then(() => dispatch(makeASandwichWithSecretSauce('Our kids')))
      .then(() => dispatch(getState().myMoney > 42 ?
                           withdrawMoney(42):
                           apologize('Me', 'The Sandwich Shop')))
  }
}

class SandwichStore extends React.Component {
  state: {
    loaded: false,
    error: null,
    data: null
  }

  componentDidMount() {
    store.dispatch(makeSandwichesForEverybody())
      .then(val => this.setState({
        loaded: true,
        data: val.data
      }))
      .catch(err => this.setState({
        loaded: false,
        error: err
      }))
  }

  render() {
    if(this.state.loading)
      return <span>Loading...</span>
    else if(this.state.error)
      return <span>Error: {this.state.error.message}</span>
    else
      return <SandwichShop data={this.state.data} />
  }
}

@connect(state => ({sandwiches: state.sandwiches}))
class SandwichShop extends React.Component {
  componentDidMount() {
    this
  }

  render() {
    return <p>{this.props.sandwiches.join('mustard')}</p>
  }
}

export default (
  <Route path='sandwich' component={SandwichStore} />
)
