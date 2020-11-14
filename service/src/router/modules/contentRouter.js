import Router from '@koa/router'
import contentController from '@/api/ContentController'

const router = new Router()
router.prefix('/content')
// 上传图片
router.post('/uploadImg', contentController.uploadImg)

// 发表新帖
router.post('/publishPost', contentController.publishPost)

export default router
