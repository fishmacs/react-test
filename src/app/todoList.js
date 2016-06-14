import {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Route} from 'react-router'

import {addTodo, toggleTodo, setVisibilityFilter} from 'app/action/todo'

export default (
  <Route path='todo' component={TodoApp} />
)

function TodoApp() {
  return (
    <div>
      <AddTodo />
      <TodoList />
      <Footer />
    </div>
  )
}

@connect()
class AddTodo extends Component {
  render() {
    let input
    return (
      <div>
        <form onSubmit={e => {
            e.preventDefault()
            if(!input.value.trim()) {
              return
            }
            this.props.dispatch(addTodo(input.value))
            input.value = ''
          }}>
            <input ref={node => {
              input = node
            }} />
            <button type='submit'>
              Add Todo
            </button>
        </form>
      </div>
    )
  }
}

function Footer() {
  return (
    <p>
      Show:
      {' '}
      <Link filter='SHOW_ALL'>
        All
      </Link>
      {', '}
      <Link filter='SHOW_ACTIVE'>
        Active
      </Link>
      {', '}
      <Link filter='SHOW_COMPLETED'>
        Complted
      </Link>
    </p>
  )
}

class Todo extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  }

  render() {
    return (
      <li onClick={this.props.onClick}
          style={{textDecoration: this.props.completed ? 'line-through' : 'none'}}>
        {this.props.text}
      </li>
    )
  }
}

function getVisibleTodos(todos, filter) {
  switch(filter) {
  case 'SHOW_ALL':
    return todos
  case 'SHOW_COMPLETED':
    return todos.filter(t => t.completed)
  case 'SHOW_ACTIVE':
    return todos.filter(t => !t.completed)
  }
}

@connect(
  state => ({
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  }),
  dispatch => ({
    onTodoClick: id => dispatch(toggleTodo(id))
  })

)
class TodoList extends Component {
  static propTypes = {
    todos: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired).isRequired,
    onTodoClick: PropTypes.func.isRequired
  }

  render() {
    const {todos, onTodoClick} = this.props
    return (
      <ul>
        {todos.map(todo =>
          <Todo
            key={todo.id}
            {...todo}
            onClick={() => onTodoClick(todo.id)}
          />
         )}
      </ul>
    )
  }
}

@connect(
  (state, ownProps) => ({
    active: ownProps.filter === state.visibilityFilter
  }),
  (dispatch, ownProps) => ({
    onClick: () => dispatch(setVisibilityFilter(ownProps.filter))
  })
)
class Link extends Component {
  static propTypes = {
    active: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired
  }

  render() {
    if(this.props.active) {
      return <span>{this.props.children}</span>
    }
    return (
      <a href='#'
         onClick={e => {
           e.preventDefault()
           this.props.onClick()
        }}>
        {this.props.children}
      </a>
    )
  }
}

