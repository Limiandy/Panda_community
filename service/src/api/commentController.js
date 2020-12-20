import Comment from '@/model/Comment'
import utils from '@/common/utils'

class CommentController {
  // 发表评论
  async publishComment (ctx) {
    const { body } = ctx.request
    const obj = utils.getJWTPayload(ctx.header.authorization)
    // 验证 验证码
    if (await utils.checkCode(body.sid, body.code)) {
      const newComment = new Comment({
        tid: body.tid,
        cuid: obj._id,
        content: body.content
      })
      const result = await newComment.save()
      ctx.body = {
        code: 200,
        data: result,
        msg: '评论成功'
      }
    } else {
      ctx.body = {
        code: 401,
        msg: '验证码错误'
      }
    }
  }

  // 获取评论列表
  async getComments (ctx) {
    const body = ctx.query
    const result = await Comment.getList({ tid: body.tid })
    if (result) {
      ctx.body = {
        code: 200,
        data: result,
        msg: '请求成功'
      }
    } else {
      ctx.body = {
        code: 500,
        msg: '当前文章无评论'
      }
    }
  }

  // 获取用户的评论列表
  async getPublicComment (ctx) {
    const body = ctx.query
    const uid = body.uid
    const result = await Comment.findByUid(uid)
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

export default new CommentController()
