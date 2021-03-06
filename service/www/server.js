import 'module-alias/register'
import Koa from 'koa'
import Jwt from 'koa-jwt'
import path from 'path'
import koaBody from 'koa-body'
import cors from '@koa/cors'
import koaJson from 'koa-json'
import statics from 'koa-static'
import helmet from 'koa-helmet'
import compose from 'koa-compose'
import router from '../src/router/index'
import { JWT_SECRET } from '../src/config/index'
import errorHandle from '../src/common/errorHandel'
const app = new Koa()

// 定义公共路径，不需要鉴权
const jwt = Jwt({ secret: JWT_SECRET }).unless({ path: [/^\/public/, /\/login/] })

const middleware = compose([
  koaBody({
    multipart: true,
    formidable: {
      keepExtensions: true,
      maxFieldsSize: 5 * 1024 * 1024
    },
    onError: err => {
      console.log('TCL: err', err)
    }
  }),
  koaJson(),
  cors(),
  helmet(),
  statics(path.join(__dirname, '../public')),
  errorHandle,
  jwt,
  router()
])
app.use(middleware)

const BASE_URL = 'localhost'
const PORT = 3000
app.listen(PORT, () => {
  console.log('服务启动成功，正在监听 ' + PORT + ' 端口')
  console.log('请访问' + BASE_URL + ':' + PORT)
})
