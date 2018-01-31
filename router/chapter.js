const Router = require('koa-router')
const compose = require('koa-compose')
const chapterController = require('../controller/chapter')

const chapter = new Router({
  prefix: '/chapter'
})

chapter.get('/:chapterId', chapterController.render)

module.exports = compose([chapter.routes(), chapter.allowedMethods()])
