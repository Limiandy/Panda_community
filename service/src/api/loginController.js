import send from '../config/MailConfig'
import moment from 'moment'
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import {JWT_SECRET} from '../config'
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

      // if (result === null) {
      //   ctx.body = {
      //     code: 502,
      //     msg: '没有此用户'
      //   }
      //   return
      // }
      let checkUserPasswd = ''
      if (result.password === body.password) {
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
          msg: '用户名或密码错误'
        }
      }

    } else {
      ctx.body = {
        code: 401,
        msg: '图片验证码不正确'
      }
    }
  }

  async register(ctx) {
    /**
     * 1. 接收用户从客户端传递过来的数据
     * 2. 验证图片验证码的时效性，正确性
     * 3. 验证用户账号及昵称是否已被注册
     * 4. 返回登录页面
     */
    const {body} = ctx.request
    let sid = body.sid
    let code = body.code
    let msg = {}
    let flag = true
    // 验证图片验证码的时效性、正确性
    if (await utils.checkCode(sid, code)) {
      // 验证帐号和昵称是否被注册
      // mongodb 查库
      const email = await crud.findOneMethod({email: body.email}).then((res) => {
        return res
      })
      const nickName = await crud.findOneMethod({nickName: body.nickName}).then((res) => {
        return res
      })

      if (email !== null && typeof email !== 'undefined') {
        msg.email = ["此邮箱已被注册，请使用此邮箱重置密码"]
        flag = false
      }
      if (nickName !== null && typeof nickName !== 'undefined') {
        msg.nickName = ["此昵称已被注册，请重新输入您喜欢的昵称"]
        flag = false
      }

      // 查库通过后，向数据库中写入用户数据信息
      if (flag) {
        // 加密用户的密码
        const hashPassword = await bcrypt.hash(body.password, 5)
        const userInfo = {
          email: body.email,
          nickName: body.nickName,
          password: hashPassword,
          created: moment().format('YYYY-MM-DD HH:mm:ss')
        }
        const result = await crud.insertMethod(userInfo)
        ctx.body = {
          code: 200,
          data: result,
          msg: '注册成功'
        }
        return
      }
    } else {
      msg.captcha = ["验证码输入不正确或已过期，请点击验证码重新获取并输入"]
    }
    ctx.body = {
      code: 500,
      msg: msg
    }
  }
}

export default new LoginController()
