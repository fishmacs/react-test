import webpack from 'webpack'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

import { STATIC, APP } from 'config/paths'
import webpackBaseConfig, { babelLoaderConfig } from './webpack-base'

export default {
  ...webpackBaseConfig,
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    ...webpackBaseConfig.plugins,
  ],
  postcss: [
    autoprefixer({ browsers: ['last 2 versions']}),
    cssnano(),
  ],
  module: {
    loaders: [{
      test: /\.css$/,
      include: [/src\/app/],
      // no extracting css-moduels in dev for hot-reloading
      //loader: ExtractTextPlugin.extract('style', 'css!postcss'),
      loaders: [
        'style',
        'css?modules&localIdentName=[path][name]-[local]',
        'postcss',
      ]
    }, {
      test: /\.css$/,
      include: [/src\/styles/],
      loader: ExtractTextPlugin.extract('style', 'css!postcss'),
    }, {
        ...babelLoaderConfig,
        query: {
            ...babelLoaderConfig.query,
          plugins: [
              ...babelLoaderConfig.query.plugins,
            ['react-transform', {
              transforms: [{
                transform: 'react-transform-hmr',
                imports: ['react'],
                locals: ['module'],
              }, {
                transform: 'react-transform-catch-errors',
                imports: ['react', 'redbox-react'],
              }],
            }],
          ]
        }
      },
      ...webpackBaseConfig.module.loaders
    ]
  }
}
