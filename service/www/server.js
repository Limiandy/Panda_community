/* global __dirname */
const koa = require('koa')
const path = require('path')
const koaBody = require('koa-body')
const cors = require('@koa/cors')
const koaJson = require('koa-json')
const statics = require('koa-static')
const app = new koa()
const router = require('../src/router/index')

app.use(koaBody())
app.use(koaJson({pretty: false, param: 'pretty'}))
app.use(cors())

app.use(statics(path.join(__dirname, '../public')))
app.use(router())
const BASE_URL = 'localhost'
const PORT = 3000
app.listen(PORT, () => {
    console.log('服务启动成功，正在监听 ' + PORT +' 端口')
    console.log('请访问' + BASE_URL + ':' + PORT)
})
