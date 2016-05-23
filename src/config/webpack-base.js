import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

import { SRC, STATIC, APP, STYLES } from 'config/paths'

export default {
  entry: {
    head: [ `${APP}/utils/loadCSS.js`],
    body: [
      'babel-polyfill',
      `${APP}/entry.js`,
    ],
  },
  output: {
    path: STATIC,
    filename: '[name].js',
    publicPath: '/static',
  },
  resolve: {
    root: SRC,
    modulesDirectories: [ 'node_modules', STYLES ],
    extensions: [
      '', '.js', '.jsx', '.es', '.es6', '.css',
    ],
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    // new CleanPlugin([ 'src/static' ], {
    //   root: ROOT,
    // }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'DEBUG': JSON.stringify(process.env.DEBUG),
      },
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin('common.js'),
    new ExtractTextPlugin('[name].css', {
      allChunks: true,
    }),
  ],
  module: {
    loaders: []
  }
}

export const babelLoaderConfig = {
  test: /\.(es6?|jsx?)$/,
  include: [ /src\/app/, /src\/config/, /src\/server/ ],
  loader: 'babel',
  query: {
    presets: [ 'es2015', 'react', 'stage-0' ],
    plugins: [
      'add-module-exports',
      'lodash',
      'ramda',
      'react-require',
      ['module-alias', [
        {src: './src/config', expose: 'config'},
        {src: './src/app', expose: 'app'},
        {src: './src/server', expose: 'server'}
      ]],
      'transform-decorators-legacy',
    ],
  }
}
