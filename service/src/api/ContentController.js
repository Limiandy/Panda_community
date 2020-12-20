import Post from '../model/Post'
import Link from '../model/Links'
import User from '../model/User'
import utils from '@/common/utils'
import { uploadPath, JWT_SECRET } from '@/config/index'
import moment from 'dayjs'
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs'
import jwt from 'jsonwebtoken'
class ContentController {
  // 请求文章列表接口
  async getPostList (ctx) {
    const body = ctx.query
    const sort = body.sort ? body.sort : 'created'
    const page = body.page ? parseInt(body.page) : 0
    const limit = body.page ? parseInt(body.limit) : 20
    const options = {}
    if (typeof body.catalog !== 'undefined' && body.catalog !== '') {
      options.catalog = body.catalog
    }
    if (typeof body.isTop !== 'undefined' && body.isTop !== '') {
      options.isTop = body.isTop
    }
    if (typeof body.status !== 'undefined' && body.status !== '') {
      options.status = body.status
    }
    if (typeof body.isEnd !== 'undefined' && body.isEnd !== '') {
      options.isEnd = body.isEnd
    }
    if (typeof body.tag !== 'undefined' && body.tag !== '') {
      options.tags = { $elemMatch: { name: body.tag } }
    }

    const detail = await Post.getList(options, sort, page, limit)

    ctx.body = {
      code: 200,
      data: detail,
      msg: '获取文章列表成功'
    }
  }

  /**
   * 查询友情链接
   * @param {*} ctx
   */
  async getLinks (ctx) {
    const detail = await Link.find({ type: 'link' })
    ctx.body = {
      code: 200,
      data: detail,
      msg: '获取成功'
    }
  }

  /**
   * 查询温馨提醒
   * @param {*}} ctx
   */
  async getTips (ctx) {
    const detail = await Link.find({ type: 'tips' })
    ctx.body = {
      code: 200,
      data: detail,
      msg: '获取成功'
    }
  }

  // 本周热议
  async getTopWeek (ctx) {
    const detail = await Post.getTopWeek()
    ctx.body = {
      code: 200,
      data: detail,
      msg: '获取成功'
    }
  }

  // 上传图片
  async uploadImg (ctx) {
    const file = ctx.request.files.file
    // 图片名称、图片格式、存储位置、返回前台一个可以读取的路径
    const ext = file.name.split('.').pop()

    // 指定图片存放路径，如是路径不存在则创建
    const dir = `${uploadPath}/images/${moment().format('YYYYMMDD')}`
    await utils.dirExists(dir)

    // 给文件一个唯一的名称，防止文件重复
    const picName = uuidv4()
    // 存储文件到指定路径
    const destPath = `${dir}/${picName}.${ext}`
    const reader = fs.createReadStream(file.path)
    const upStream = fs.createWriteStream(destPath)
    const filePath = `/images/${moment().format('YYYYMMDD')}/${picName}.${ext}`
    // 方法一，针对小文件使用
    reader.pipe(upStream)

    // 方法二，针对大文件使用，可以监听文件的状态
    // TODO: 该方法现在还存在问题，需要要后期调试， 上传图片不完整
    // reader.on('data', (chunk) => {
    //   upStream.write(chunk)
    //   if (upStream.write(chunk) === false) {
    //     reader.pause()
    //   }
    // })

    // reader.on('drain', () => {
    //   reader.resume()
    // })

    // reader.on('end', () => {
    //   upStream.end()
    // })
    ctx.body = {
      code: 200,
      data: filePath,
      msg: '图片上传成功'
    }
  }

  // 发表新帖
  async publishPost (ctx) {
    const { body } = ctx.request
    // 1. 验证验证码真实有效
    if (await utils.checkCode(body.sid, body.code)) {
      // 解析 token
      const obj = utils.getJWTPayload(ctx.header.authorization)
      // 查询用户信息
      const user = await User.findByID(obj._id)
      // 判断用户的 fav 数量是否足够发帖，如果不够，返回提醒，否则新建POST
      if (user.favs < body.offerFav) {
        ctx.body = {
          code: 501,
          msg: '积分不足'
        }
      } else {
        // TODO: 这里应该在做一层逻辑，如果用户发布的文章，不属于问答帖则不更新用户的积分，以免造成资源浪费
        await User.updateOne({ _id: obj._id }, { $inc: { favs: -body.offerFav } })
      }
      const newPost = new Post(body)
      // TODO: 这里逻辑应该改变，应该在查询时使用联合查询，而不是在这里保存用户id 冗余字段
      newPost.uid = obj._id
      const detail = await newPost.save()
      ctx.body = {
        code: 200,
        data: detail,
        msg: '发帖成功'
      }
    } else {
      ctx.body = {
        status: 401,
        msg: ['图片验证码不正确']
      }
    }
  }

  // 文章详情
  async getDetail (ctx) {
    const body = ctx.query
    // 查询文章
    const detail = await Post.findOne({ _id: body.tid })
    if (detail) {
      // 查询文章作者
      const user = await User.findByID(detail.uid)
      // 过滤作者敏感信息
      const fillter = ['password', 'username', 'roles']
      fillter.map((item) => {
        return delete user[item]
      })
      // 返回作者信息
      detail.uid = user
      // 更新文章被阅读数
      await Post.updateOne({ _id: body.tid }, { $inc: { reads: 1 } })
      // 阅读者是否是管理员
      let isAdmin = false
      if (body.token) {
        const obj = jwt.verify(body.token, JWT_SECRET)
        const peruser = await User.findByID(obj._id)
        isAdmin = peruser.roles.find(item => item === 'admin')
      }

      ctx.body = {
        code: 200,
        data: detail,
        isAdmin: isAdmin,
        msg: '请求成功'
      }
    } else {
      ctx.body = {
        code: 500,
        msg: '没有该文章'
      }
    }
  }

  // 请求最近发表的文章
  async getPublicPost (ctx) {
    const body = ctx.query
    const page = body.page ? body.page : 0
    const result = await Post.findByUid(body.uid, -1, page, 10)
    if (result) {
      ctx.body = {
        code: 200,
        data: result,
        msg: '请求成功'
      }
    } else {
      ctx.body = {
        code: 500,
        msg: '请求失败'
      }
    }
  }
}

export default new ContentController()
