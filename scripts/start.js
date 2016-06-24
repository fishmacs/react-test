import app from 'server'
import { isDevMode } from 'app/utils'
import config from 'config/appSetup'
import hotReload from './hotReload.js'

if(isDevMode())
  hotReload(app)

config(app)

app.listen(3000)
