import send from '../config/MailConfig'
import moment from 'moment'
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
}

export default new LoginController()
