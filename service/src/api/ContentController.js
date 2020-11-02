import Post from '../model/Post'
import Link from '../model/Links'
class ContentController {
  async getPostList (ctx) {
    const body = ctx.query

    // 测试数据
    // const post = new Post({
    //   title: 'test title 123',
    //   content: 'test content 123',
    //   catalog: 'share',
    //   fav: 20,
    //   isEnd: '0',
    //   reads: '0',
    //   answer: '0',
    //   status: '0',
    //   isTop: '1',
    //   sort: '0',
    //   tags: [{
    //     name: '精华',
    //     class: ''
    //   }]
    // })
    // const tmp = await post.save()
    // console.log(tmp)

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

  async getTopWeek (ctx) {
    const result = await Post.getTopWeek()
    ctx.body = {
      code: 200,
      data: result,
      msg: '获取成功'
    }
  }
}

export default new ContentController()
