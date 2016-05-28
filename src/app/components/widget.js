import {connect} from 'react-redux'
import {Link} from 'react-router'

import {fetchWidgetList, deleteWidget, loadSearchLayout} from 'app/action/westfall'
import store from 'app/services/store'
import styles from 'app/styles/westfall'

@connect(state => ({widgets: state.widget.data}))
export class WidgetListContainer extends React.Component {
  componentDidMount() {
    store.dispatch(fetchWidgetList())
    store.dispatch(loadSearchLayout('widget', 'Widget Results'))
  }

  deleteWidget(widgetId) {
    store.dispatch(deleteWidget(widgetId))
  }

  render() {
    return <WidgetList widgets={this.props.widgets} deleteWidget={this.deleteWidget} />
  }
}

function WidgetList(props) {
  return (
    <div className={styles['data-list']}>
      {props.widgets.map(widget => {
        return (
          <div key={widget.id} className={styles['data-list-item']}>
            <div className={styles.details}>
              {widget.name}
            </div>
            <div className={styles.controls}>
              <button onClick={props.deleteWidget.bind(null, widget.id)} className={styles.delete}>
                Delete
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
