
import koa from 'koa'
import path from 'path'
import koaBody from 'koa-body'
import cors from '@koa/cors'
import koaJson from 'koa-json'
import statics from 'koa-static'
import helmet from 'koa-helmet'
import compose from 'koa-compose'
import router from '../src/router/index'
const app = new koa()

const middleware = compose([
  koaBody(),
  koaJson({pretty: false, param: 'pretty'}),
  cors(),
  helmet(),
  statics(path.join(__dirname, '../public')),
  router()
])
app.use(middleware)

const BASE_URL = 'localhost'
const PORT = 3000
app.listen(PORT, () => {
    console.log('服务启动成功，正在监听 ' + PORT +' 端口')
    console.log('请访问' + BASE_URL + ':' + PORT)
})
