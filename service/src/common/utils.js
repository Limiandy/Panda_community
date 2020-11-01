import { getValue } from '../config/RedisConfig'

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
}

export default new Utils()
