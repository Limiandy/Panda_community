import SignRecord from '../model/SignRecord'
import utils from '../common/utils'
import User from '../model/User'
import moment from 'dayjs'
import send from '@/config/MailConfig'
import { v4 as uuidv4 } from 'uuid'
import jwt from 'jsonwebtoken'
import { setValue, getValue } from '@/config/RedisConfig'
import { JWT_SECRET } from '@/config/index'

function getFavs (count) {
  let favs = 0
  count += 1
  if (count < 5) {
    favs = 5
  } else if (count >= 5 && count < 15) {
    favs = 10
  } else if (count >= 15 && count < 30) {
    favs = 15
  } else if (count >= 30 && count < 100) {
    favs = 20
  } else if (count >= 100 && count < 365) {
    favs = 30
  } else if (count >= 365) {
    favs = 50
  }
  return favs
}

class UserController {
  // 用户签到接口
  async userSign (ctx) {
    /**
     * 用户签到接口逻辑
     * 1. 获取用户ID
     * 2. 查询用户最后一次签到记录
     * 3. 判断签到逻辑
     */
    const tokenObj = await utils.getJWTPayload(ctx.header.authorization)
    const record = await SignRecord.findByUid(tokenObj._id)
    const user = await User.findById(tokenObj._id)
    let newRecord = {}
    let result = {}
    if (record !== null) {
      // 用户有历史签到数据
      // 判断用户最后一次签到的日期是否与当前的日期相同，如果相同，表示：用户今日已签到
      if (moment(record.created).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')) {
        ctx.body = {
          code: 5001, // 表示用户今日已签到
          data: {
            favs: user.favs,
            count: user.count,
            lastSign: record.created
          },
          msg: '用户今日已签到'
        }
        return
      } else {
        // 如果时间不相同，表示：用户今日还没有签到；需要判断用户是否是在连续签到
        let favs = 0
        let flag = false
        if (moment(record.created).format('YYYY-MM-DD') === moment().subtract(1, 'days').format('YYYY-MM-DD')) {
          // 如果用户的最后一次签到日期是当前日期的前一天，表示：用户在连续签到
          favs = getFavs(user.count)
          await User.updateOne({ _id: tokenObj._id }, {
            $inc: { favs: favs, count: 1 }
          })
          result = {
            count: user.count + 1,
            favs: user.favs + favs
          }
          flag = true
        } else {
          // 表示用户签到不是连续的，已经断签
          await User.updateOne(
            { _id: tokenObj._id },
            {
              $set: { count: 1 },
              $inc: { favs: 5 }
            }
          )
          result = {
            count: 1,
            favs: user.favs + 5
          }
          flag = true
        }
        if (flag) {
          newRecord = new SignRecord(
            {
              uid: tokenObj._id,
              favs: favs
            }
          )
          await newRecord.save()
        } else {
          ctx.body = {
            code: 501,
            msg: '服务器错误'
          }
          return
        }
      }
    } else {
      // 用户为第一次签到
      // 保存用户签到的数据，签到数 + 积分数
      await User.updateOne({
        _id: tokenObj._id
      }, {
        $set: { count: 1 },
        $inc: { favs: 5 }
      })
      // 保存用户签到记录
      newRecord = new SignRecord({
        uid: tokenObj._id,
        favs: 5
      })
      await newRecord.save()
      result = {
        favs: 5,
        count: 1
      }
    }

    ctx.body = {
      code: 200,
      data: result,
      lastSign: newRecord.created,
      msg: '签到成功'
    }
  }

  // 更新用户基本信息
  async updateUserInfo (ctx) {
    const { body } = ctx.request
    const obj = await utils.getJWTPayload(ctx.header.authorization)
    let msg = ''
    // 判断用户是否是修改了邮箱
    const user = await User.findOne({ _id: obj._id })
    if (body.username && body.username !== user.username) {
      // 表示用户修改了邮箱
      // 发送reset邮件
      // 判断用户的新邮箱是否已被注册
      const tmpUser = await User.findOne({ username: body.username })
      if (tmpUser && tmpUser.password) {
        // 说明此邮箱已被注册
        ctx.body = {
          code: 501,
          msg: '此邮箱已被注册'
        }
        return
      }
      const key = uuidv4()
      setValue(key, jwt.sign({ _id: obj._id }, JWT_SECRET, { expiresIn: '30m' }))
      const result = await send({
        type: 'email',
        data: {
          username: body.username,
          key: key
        },
        code: '',
        expire: moment().add(30, 'minutes').format('YYYY-MM-DD HH:mm:ss'),
        email: user.username,
        user: user.nickName
      })
      if (result.n === 1 && result.ok === 1) {
        msg = '更新资料成功，验证邮件发送成功，请在邮箱中确认修改邮箱帐号！'
      }
    }
    // 用户修改了除邮箱以外的其它资料
    const arr = ['username', 'mobile', 'password']
    arr.map(item => delete body[item])
    const result = await User.updateOne({ _id: obj._id }, body)
    if (result.n === 1 && result.ok === 1) {
      ctx.body = {
        code: 200,
        msg: msg === '' ? '更新成功' : msg
      }
    } else {
      ctx.body = {
        code: 500,
        msg: '更新失败'
      }
    }
  }

  // 更新用户名
  async updateUsername (ctx) {
    const body = ctx.query
    if (body.key) {
      const token = await getValue(body.key)
      const obj = utils.getJWTPayload('Bearer ' + token)
      const result = await User.updateOne({ _id: obj._id }, {
        username: body.username
      })
      if (result.n === 1 && result.ok === 1) {
        ctx.body = {
          code: 200,
          msg: '更新用户名成功'
        }
      } else {
        ctx.body = {
          code: 500,
          msg: '更新用户名失败'
        }
      }
    }
  }
}

export default new UserController()
