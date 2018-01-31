const Router = require('koa-router')
const compose = require('koa-compose')
const chapterController = require('../../controller/chapter')

const chapter = new Router({
  prefix: '/v1/chapter'
})

/**
 * 获取章节信息 - 主要为标题、内容、前后章节信息，如果尚未购买，提示购买
 */
chapter.get('/:chapterId', chapterController.getInfo)

/**
 * 购买此章节（要求登录）
 */
chapter.post('/:chapterId/purchase', chapterController.purchase)

 /**
  * 记录此章节阅读（要求登录）
  */
chapter.post('/:chapterId/record', async ctx => {
})

module.exports = compose([chapter.routes(), chapter.allowedMethods()])
