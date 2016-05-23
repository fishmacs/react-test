const rt = require('koa-router')
const debug = require('debug')('router')

import path from 'path'
import sendfile from 'koa-sendfile'

const router = rt()
const apiRouter = rt({prefix: '/api'})

apiRouter.get('articles', '/articles', function *() {
  this.body = {
    result: 'ok',
    data: [
      {
        title: 'Immutable 详解及 React 中实践',
      },
      {
        title: 'React 源码剖析系列 － 生命周期的管理艺术',
      },
      {
        title: 'React 源码剖析系列 － 解密 setState',
      },
      {
        title: 'React 源码剖析系列 － 不可思议的 react diff',
      },
      {
        title: 'Architecting Android with RxJava  程序亦非猿的Android旅程',
      },
      {
        title: '学习 React Native for Android：React 基础  Android&iOS工程师之路',
      },
      {
        title: 'MVVM_Android-CleanArchitecture  Rocko',
      },
      {
        title: '使用 Go 开发一个 Slack 运维机器人  Java程序员',
      },
    ]
  }
})

router.use(apiRouter.routes())

function *demoClientRender() {
  const html = path.join(__dirname, '../views/index.html')
  debug(html)
  yield sendfile(this, path.join(__dirname, '../views/index.html'))
}

router.get('demo', '/(.*)', demoClientRender)

export default router

