import send from '../config/MailConfig'
import moment from 'moment'
import jsonwebtoken from 'jsonwebtoken'
import { JWT_SECRET } from '../config'
import utils from '../common/utils'
import CRUD from '../model/Crud'
import User from '../model/User'
const crud = new CRUD(User)


class LoginController {
  constructor () {}
  async forget(ctx) {
    const { body } = ctx.request
    try {
      let result = await send({
          captcha: '00967785',
          expire: moment().add(30, 'minutes').format('YYYY-MM-DD HH:mm:ss'),
          email: body.email,
          user: 'Andy'
      })
      ctx.body = {
        status: 200,
        data: result,
        msg: '邮件发送成功'
      }
    } catch (e) {
      console.log(e)
    }
  }

  async login(ctx) {
    /**
     * 1. 接收用户从客户端传递过来的数据
     * 2. 验证图片验证码的时效性，正确性
     * 3. 验证用户账号 密码的正确性
     * 4. 返回token
     */
    const {body} = ctx.request
    let sid = body.sid
    let code = body.code
    // 验证图片验证码的时效性、正确性
    if (await utils.checkCode(sid, code)) {
      // 验证帐号密码的正确性
      console.log('check ok')

      // mongodb 查库
     const result = await crud.findOneMethod({email: body.email}).then((res) => {
        return res
      })

      if (result === null) {
        ctx.body = {
          code: 502,
          msg: '没有此用户'
        }
        return
      }
      let checkUserPasswd = ''
      let user = result
      if (user.password === body.password) {
        checkUserPasswd = true
      }
      if (checkUserPasswd) {
        // 验证通过，返回token
        let token = jsonwebtoken.sign({_id: 'Andy'}, JWT_SECRET, { expiresIn: '1d' })
        ctx.body = {
          code: 200,
          token: token
        }
      } else {
        // 帐号密码验证失败
        ctx.body = {
          code: 404,
          msg: '用户密码错误'
        }
      }

    } else {
      ctx.body = {
        code: 401,
        msg: '图片验证码不正确'
      }
    }
  }
}

export default new LoginController()
