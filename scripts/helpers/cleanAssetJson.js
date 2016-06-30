import debug from 'debug'
import rimraf from 'rimraf'

import { isDevMode } from 'app/utils'
import {ASSET_FILE} from 'config/paths'

const log = {
  clean: debug('clean-assets')
}

export default function() {
  rimraf(ASSET_FILE, err => {
    if (err) {
      log.clean(err)
      process.exit(1)
    }
  })
}


