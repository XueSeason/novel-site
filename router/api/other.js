const Router = require('koa-router')
const compose = require('koa-compose')
const otherController = require('../../controller/other')

const other = new Router({
  prefix: '/v1'
})

/**
 * SNS 登录回调
 */
other.get('/login/:sns/callback', otherController.loginCallback)

/**
 * 退出登录
 */
other.get('/logout', otherController.logout)

/**
 * 模拟登录 测试使用
 */
// other.get('/login/:sns/mock', otherController.mockLogin)

module.exports = compose([other.routes(), other.allowedMethods()])
