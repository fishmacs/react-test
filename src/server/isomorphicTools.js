import IsomorphicTools from 'webpack-isomorphic-tools'
import IsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin'
import config from 'config/isomorphic-config'

export const isomorphicTools = new IsomorphicTools(config)
export const isomorphicPlugin = new IsomorphicToolsPlugin(config)
