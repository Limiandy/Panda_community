import Router from '@koa/router'
import publicController from '../api/publicController'
import contentController from '../api/ContentController'
const router = new Router()
router.prefix('/public')
router.get('/getcaptcha', publicController.getCaptcha)
router.get('/list', contentController.getPostList)
export default router
