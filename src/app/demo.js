import { IndexLink, Link } from 'react-router'
import styles from 'app/styles/demo.css'

export class Demo extends React.Component {
  render() {
    return (
      <div>
        <nav className={styles.nav}>
          <IndexLink to='/'>
            Home
          </IndexLink>
          <Link to='/router'>
            Router
          </Link>
          <Link to='/blog'>Blog</Link>
          <Link to='/ryf'>Ruan</Link>
          <Link to='/westfall'>Westfall</Link>
          <Link to='/gallery'>Image Gallery</Link>
          <Link to='/todo'>Todo List</Link>
          <Link to='/reddit'>Reddit</Link>
        </nav>
        { this.props.children }
      </div>
    )
  }
}

