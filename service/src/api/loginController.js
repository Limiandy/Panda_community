import send from '../config/MailConfig'
import moment from 'moment'
import jsonwebtoken from 'jsonwebtoken'
import { JWT_SECRET} from '../config'

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
   let token = jsonwebtoken.sign({_id: 'Andy', exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24}, JWT_SECRET)
    ctx.body = {
      code: 200,
      token: token
    }
  }
}

export default new LoginController()
