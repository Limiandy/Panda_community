import svgCaptcha from 'svg-captcha'
import { setValue } from '../config/RedisConfig'
class PublicController {
  constructor() {
  }
  async getCaptcha(ctx) {
    const body = ctx.request.query
    const newCaptcha = svgCaptcha.create({
      size: 4,
      ignoreChars: '0o1i',
      noise: 1,
      color: true,
      fontSize: 35,
      height: 25
    })
    // 保存图片验证码数据，设置超时时间，单位 S
    // 设置超时时间为10分钟
    setValue(body.sid, newCaptcha.text, 10 * 60)
    ctx.body = {
      status: 200,
      svg: newCaptcha.data,
      text: newCaptcha.text
    }
  }
}

export default new PublicController()
