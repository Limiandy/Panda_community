import SignRecord from '../model/SignRecord'
import utils from '../common/utils'
import User from '../model/User'
import moment from 'dayjs'

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
}

export default new UserController()
