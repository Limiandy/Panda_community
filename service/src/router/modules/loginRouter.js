import Router from '@koa/router'
import loginController from '@/api/loginController'
const router = new Router()
router.prefix('/login')
// 重置密码
router.post('/forget', loginController.forget)
// 登录
router.post('/login', loginController.login)
// 注册
router.post('/register', loginController.register)

export default router
