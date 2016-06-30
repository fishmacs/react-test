import debug from 'debug'
import cssModulesHook from 'css-modules-require-hook'
import autoprefixer from 'autoprefixer'

import {ROOT} from 'config/paths'

const log = {
  css: debug('css-hook')
}

log.css('Building CSS-modules for all .css files')

cssModulesHook({
  extensions: ['.css'],
  prepend: [autoprefixer({browsers: ['last 2 versions']})],
  generateScopedName(exportedName, exportedPath) {
    const path = exportedPath
            .replace(`${ROOT}`, '')
            .replace(/^\//, '')
            .replace(/\/|\./g, '-')
    return `${path}-${exportedName}`
  }
})
