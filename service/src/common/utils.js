import { getValue } from '../config/RedisConfig'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/index'
class Utils {
  async checkCode (key, value) {
    const redisValue = await getValue(key)
    if (redisValue !== null) {
      if (redisValue.toLowerCase() === value.toLowerCase()) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  }

  getJWTPayload (token) {
    return jwt.verify(token.split(' ')[1], JWT_SECRET)
  }
}

export default new Utils()
