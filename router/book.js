const Router = require('koa-router')
const compose = require('koa-compose')
const bookController = require('../controller/book')

const book = new Router({
  prefix: '/book'
})

book.get('/list', bookController.getList)

book.get('/:bookId', bookController.render)

module.exports = compose([book.routes(), book.allowedMethods()])
