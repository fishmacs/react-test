import { Route, Link } from 'react-router'

class RyfDemo extends React.Component {
  render() {
    return (
      <div>
        <h3>Ruan YiFeng's demo</h3>
        <ul>
          <li><Link to='/ryf/demo5'>Demo5</Link></li>
        </ul>
        { this.props.children }
      </div>
    )
  }
}

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

// class NoteList extends React.Component {
//   render() {
//     return (
//       <ol>
//         {
//           React.Children.map(this.props.children, (child) => <li>{child}</li>)
//         }
//       </ol>
//     )
//   }
// }

function Demo5() {
    return (
      <NoteList>
        <span>hello</span>
        <span>world</span>
      </NoteList>
    )
}

// class Demo5 extends React.Component {
//   render() {
//     return (
//       <NoteList>
//         <span>hello</span>
//         <span>world</span>
//       </NoteList>
//     )
//   }
// }

export default (
  <Route path='ryf' component={RyfDemo}>
    <Route path='demo5' component={Demo5} />
  </Route>
)
