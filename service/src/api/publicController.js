import svgCaptcha from 'svg-captcha'
class PublicController {
  constructor() {
  }
  async getCaptcha(ctx) {
    const newCaptcha = svgCaptcha.create({
      size: 4,
      ignoreChars: '0o1i',
      noise: 1,
      color: true
    })
    ctx.body = {
      status: 200,
      svg: newCaptcha.data,
      text: newCaptcha.text
    }
  }
}

export default new PublicController()