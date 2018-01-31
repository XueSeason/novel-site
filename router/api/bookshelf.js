const Router = require('koa-router')
const compose = require('koa-compose')

const bookshelf = new Router({
  prefix: '/v1/bookshelf'
})

/**
 * 加入书架（要求登录）
 */
bookshelf.post('/', async ctx => {

})

/**
 * 书架查询（要求登录）
 */
bookshelf.get('/', async ctx => {

})

module.exports = compose([bookshelf.routes(), bookshelf.allowedMethods()])
