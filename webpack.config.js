//require('babel-register')
//const paths = require('./src/config/paths')
import { STATIC } from 'config/paths'

export default {
  entry: 'src/app/entry.js',
  output: {
    path: paths.STATIC,
    filename: 'bundle.js',
    publicPath: '/static',
  },
  module: {
    loaders: [
      {
        test: /\.(es6?|jsx?)$/,
        include: [ /src\/app/, /src\/config/, /src\/server/ ],
        loader: 'babel',
      }
    ]
  }
}

export const babelLoaderConfig = {
  test: /\.(es6?|jsx?)$/,
  include: [ /src\/app/, /src\/config/, /src\/server/ ],
  loader: 'babel',
  query: {
    'presets': [ 'es2015', 'react', 'stage-0' ],
    'plugins': [
      'add-module-exports',
      'lodash',
      'ramda',
      'react-require',
      [ 'provide-modules', {
        'debug': 'debug',
      } ],
      'babel-root-import',
      'transform-decorators-legacy',
      ['module-alias', [
        {'src': './src/config', 'expose': 'config'},
        {'src': './src/app', 'expose': 'app'},
        {'src': './src/server', 'expose': 'server'}
      ]]
    ],
  },
}
