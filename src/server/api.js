const rt = require('koa-router')
import {join} from 'path'
import {readFileSync} from 'fs'

const apiRouter = rt({prefix: '/api'})

export default apiRouter

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

apiRouter.get('/user', function *() {
  const query = this.query.q
  let users = data.users
  if (query) {
    users = users.filter(u => u.name.match(new RegExp(query, 'i')))
  }
  this.body = {
    result: 'ok',
    data: users
  }
})

apiRouter.get('/user/:id', function *() {
  const id = parseInt(this.params.id)
  const user = data.users.filter(u => u.id === id)[0]
  this.body = {
    result: 'ok',
    data: user
  }
})

apiRouter.delete('/user/:id', function *() {
  const id = parseInt(this.params.id)
  data.users = data.users.filter(u => u.id !== id)
  this.body = {
    result: 'ok'
  }
})

apiRouter.get('/widget', function *() {
  const query = this.query.q
  let widgets = data.widgets
  if (query) {
    widgets = widgets.filter(u => u.name.match(new RegExp(query, 'i')))
  }
  this.body = {
    result: 'ok',
    data: widgets
  }
})

apiRouter.delete('/widget/:id', function *() {
  const id = parseInt(this.params.id)
  data.widgets = data.widgets.filter(u => u.id !== id)
  this.body = {
    result: 'ok'
  }
})

var data = loadData()

function loadData() {
  return JSON.parse(readFileSync(join(__dirname, 'westfall.json')))
}
