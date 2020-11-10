import Post from '../model/Post'
import Link from '../model/Links'
import utils from '@/common/utils'
import { uploadPath } from '@/config/index'
import moment from 'dayjs'
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs'
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

    const result = await Post.getList(options, sort, page, limit)

    ctx.body = {
      code: 200,
      data: result,
      msg: '获取文章列表成功'
    }
  }

  /**
   * 查询友情链接
   * @param {*} ctx
   */
  async getLinks (ctx) {
    const result = await Link.find({ type: 'link' })
    ctx.body = {
      code: 200,
      data: result,
      msg: '获取成功'
    }
  }

  /**
   * 查询温馨提醒
   * @param {*}} ctx
   */
  async getTips (ctx) {
    const result = await Link.find({ type: 'tips' })
    ctx.body = {
      code: 200,
      data: result,
      msg: '获取成功'
    }
  }

  // 本周热议
  async getTopWeek (ctx) {
    const result = await Post.getTopWeek()
    ctx.body = {
      code: 200,
      data: result,
      msg: '获取成功'
    }
  }

  // 上传图片
  async uploadImg (ctx) {
    const file = ctx.request.files.file
    // 图片名称、图片格式、存储位置、返回前台一个可以读取的路径
    const ext = file.name.split('.').pop()

    // 指定图片存放路径，如是路径不存在则创建
    const dir = `${uploadPath}/${moment().format('YYYYMMDD')}`
    await utils.dirExists(dir)

    // 给文件一个唯一的名称，防止文件重复
    const picName = uuidv4()
    // 存储文件到指定路径
    const destPath = `${dir}/${picName}.${ext}`
    const reader = fs.createReadStream(file.path)
    const upStream = fs.createWriteStream(destPath)
    const filePath = `/${moment().format('YYYYMMDD')}/${picName}.${ext}`
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
}

export default new ContentController()
