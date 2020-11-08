import Router from '@koa/router'
import publicController from '@/api/publicController'
import contentController from '@/api/ContentController'
const router = new Router()
router.prefix('/public')
// 获取验证码
router.get('/getcaptcha', publicController.getCaptcha)
// 获取文章列表
router.get('/list', contentController.getPostList)
// 获取友情链接
router.get('/links', contentController.getLinks)
// 获取温馨提醒
router.get('/tips', contentController.getTips)
// 获取本周热议
router.get('/topWeek', contentController.getTopWeek)
export default router
