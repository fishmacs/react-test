import { STATIC } from 'config/paths'

export default {
  entry: 'src/app/entry.js',
  output: {
    path: STATIC,
    filename: 'bundle.js',
    publicPath: '/static',
  }
}
