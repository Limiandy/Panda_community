import send from '../config/MailConfig'
import moment from 'dayjs'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config'
import utils from '../common/utils'
import User from '../model/User'
import SignRecord from '../model/SignRecord'
import { v4 as uuidv4 } from 'uuid'
import { setValue } from '@/config/RedisConfig'
class LoginController {
  /**
   * 用户申请重置密码接口
   */
  async forget (ctx) {
    const { body } = ctx.request
    const sid = body.sid
    const code = body.captcha
    const username = body.username
    /**
       * 1. 验证验证码是否过期或是否正确
       * 2. 以邮箱为字段查询数据库，如果数据库中存在该邮箱，返回用户基本信息，如果不存在向前端返回错误
       * 3. 发送验证邮件
       */
    if (await utils.checkCode(sid, code)) {
      if (!username) {
        ctx.body = {
          code: 500,
          msg: '用户信息输入不正确'
        }
        return
      }
      const user = await User.findOne({ username: username })
      if (user && user.password) {
        // 系统中存在该用户
        const key = uuidv4()
        setValue(key, jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '30m' }), 30 * 60)
        const result = await send({
          type: 'reset',
          data: {
            key: key
          },
          expire: moment().add(30, 'minutes').format('YYYY-MM-DD HH:mm:ss'),
          email: body.username,
          user: user.nickName
        })
        if (result) {
          ctx.body = {
            status: 200,
            data: result,
            msg: '邮件发送成功'
          }
        }
      } else {
        ctx.body = {
          code: 500,
          msg: '该邮箱还没有注册，是否使用该邮箱注册'
        }
      }
    } else {
      ctx.body = {
        status: 401,
        msg: ['图片验证码不正确']
      }
    }
  }

  /**
   *
   * 用户登录
   */
  async login (ctx) {
    /**
     * 1. 接收用户从客户端传递过来的数据
     * 2. 验证图片验证码的时效性，正确性
     * 3. 验证用户账号 密码的正确性
     * 4. 返回token
     */
    const { body } = ctx.request
    const sid = body.sid
    const code = body.code
    // 验证图片验证码的时效性、正确性
    if (await utils.checkCode(sid, code)) {
      // 验证帐号密码的正确性
      // mongodb 查库
      const user = await User.findOne({ username: body.email }).then((res) => {
        return res
      })
      let checkUserPasswd = ''
      if (await bcrypt.compare(body.password, user.password)) {
        checkUserPasswd = true
      }
      if (checkUserPasswd) {
        // 验证通过，返回token
        const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '1d' })
        const userObj = user.toJSON()
        const fillter = ['password', 'username', 'roles']
        fillter.map((item) => {
          return delete userObj[item]
        })
        // 加入isSign属性
        const signRecord = await SignRecord.findByUid(userObj._id)
        if (signRecord !== null) {
          if (moment(signRecord.created).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')) {
            userObj.isSign = true
          } else {
            userObj.isSign = false
          }
          userObj.lastSign = signRecord.created
        } else {
          userObj.isSign = false
        }
        ctx.body = {
          code: 200,
          data: userObj,
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

  // 用户注册
  async register (ctx) {
    /**
     * 1. 接收用户从客户端传递过来的数据
     * 2. 验证图片验证码的时效性，正确性
     * 3. 验证用户账号及昵称是否已被注册
     * 4. 返回登录页面
     */
    const { body } = ctx.request
    const sid = body.sid
    const code = body.code
    const msg = {}
    let flag = true
    // 验证图片验证码的时效性、正确性
    if (await utils.checkCode(sid, code)) {
      // 验证帐号和昵称是否被注册
      // mongodb 查库
      const email = await User.findOne({ username: body.email }).then((res) => {
        return res
      })
      const nickName = await User.findOne({ nickName: body.nickName }).then((res) => {
        return res
      })

      if (email !== null && typeof email !== 'undefined') {
        msg.email = ['此邮箱已被注册，请使用此邮箱重置密码']
        flag = false
      }
      if (nickName !== null && typeof nickName !== 'undefined') {
        msg.nickName = ['此昵称已被注册，请重新输入您喜欢的昵称']
        flag = false
      }

      // 查库通过后，向数据库中写入用户数据信息
      if (flag) {
        // 加密用户的密码
        const hashPassword = await bcrypt.hash(body.password, 5)
        const userInfo = {
          username: body.email,
          nickName: body.nickName,
          password: hashPassword
        }
        const result = await new User(userInfo).save()
        ctx.body = {
          code: 200,
          data: result,
          msg: '注册成功'
        }
        return
      }
    } else {
      msg.captcha = ['验证码输入不正确或已过期，请点击验证码重新获取并输入']
    }
    ctx.body = {
      code: 500,
      msg: msg
    }
  }
}

export default new LoginController()
