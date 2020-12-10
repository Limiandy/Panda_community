import Router from '@koa/router'
import commentController from '@/api/commentController'

const router = new Router()
router.prefix('/comment')
// 发表评论
router.post('/publish-comment', commentController.publisComment)
export default router
