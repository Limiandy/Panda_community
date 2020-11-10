import { getValue } from '../config/RedisConfig'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/index'
import fs from 'fs'
import path from 'path'
class Utils {
  // 验证图片验证码的真实性和有效性
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

  /**
   * 解析 用户传递过来的 token 数据
   * @param {Token} token
   */
  getJWTPayload (token) {
    return jwt.verify(token.split(' ')[1], JWT_SECRET)
  }

  // 获取路径的状态
  getStats (path) {
    return new Promise(resolve => {
      fs.stat(path, (err, stats) => err ? resolve(false) : resolve(stats))
    })
  }

  // 创建目录
  mkdir (path) {
    return new Promise(resolve => {
      fs.mkdir(path, (err) => err ? resolve(false) : resolve(true))
    })
  }

  /**
   * 循环遍历，递归判断，如果上级目录不存在，则创建上级目录
   * @param {path} dir
   */
  async dirExists (dir) {
    const isExists = await this.getStats(dir)
    // 如果该路径存在且不是文件，返回true
    if (isExists && isExists.isDirectory()) {
      return true
    } else if (isExists) {
      // 表示路径存在，但是 是文件
      return false
    }
    // 该路径不存在
    const tempDir = path.parse(dir).dir
    // 循环遍历，递归判断，如果上级目录不存在，则创建上级目录
    const status = await this.dirExists(tempDir)
    if (status) {
      const result = await this.mkdir(dir)
      return result
    } else {
      return false
    }
  }
}

export default new Utils()
