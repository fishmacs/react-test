import React from 'react'
import ReactDOMServer from 'react-dom/server'
import DocumentMeta from 'react-document-meta'

import {hasWindow} from 'app/utils'

const { PropTypes } = React

class Html extends React.Component {
  static propTypes = {
    initialState: PropTypes.object,
    headScripts: PropTypes.array,
    bodyScripts: PropTypes.array,
    headStyles: PropTypes.array,
    bodyStyles: PropTypes.array
  }

  static defaultProps = {
    headScripts: [],
    bodyScripts: [],
    headStyles: [],
    bodyStyles: []
  }

  render() {
    const {
      initialState,
      headScripts, bodyScripts,
      headStyles, bodyStyles
    } = this.props
    return (
      <html>
        <head>
          {hasWindow ? null : DocumentMeta.renderAsReact()}
          <link rel='icon' type='image/x-icon' href='/static/favicon.ico' />
          {headStyles.map((style, i) =>
            <link href={style} key={i} type='text/css' rel='stylesheet' media='screen' />

          )}
          <script dangerouslySetInnerHTML={{
            __html: `window.__INITIAL_STATE__ = ${JSON.stringify(initialState, null, 2)};`
          }}
          />
          {headScripts.map((script, i) =>
            <script src={script} key={i} />
          )}
        </head>
        <body>
          <div id='application-root'
            dangerouslySetInnerHTML={{
              __html: ::this.getDivContent()
            }}
          />
          {bodyScripts.map((script, i) =>
            <script src={script} key={i} />
          )}
          {bodyStyles.map((style, i) =>
            <script key={i} dangerouslySetInnerHTML={{
              __html: `loadCSS('${style}')`
            }} />
          )}
          {bodyStyles.map((style, i) =>
            <noscript key={i} dangerouslySetInnerHTML={{
              __html: `<link ref="${style}" rel="stylesheet" />`
            }} />
          )}
        </body>
      </html>
    )
  }

  getDivContent() {
    const {children} = this.props
    const html = children ? ReactDOMServer.renderToString(children) : null
    return html
  }
}

export function makeHtml(initialState, assets, content) {
  return '<!DOCTYPE html>' + ReactDOMServer.renderToString(
    <Html initialState={initialState}
          headScripts={assets.headScripts}
          bodyScripts={assets.bodyScripts}
          headStyles={assets.headStyles}
          bodyStyles={assets.bodyStyles}
          children={content}
    />
  )
}
