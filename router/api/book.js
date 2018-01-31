const Router = require('koa-router')
const compose = require('koa-compose')
const bookController = require('../../controller/book')

const book = new Router({
  prefix: '/v1/book'
})

/**
 * 获取书籍排行
 */
book.get('/rank', bookController.getRank)

/**
 * 获取书籍信息
 */
book.get('/:bookId', bookController.getBook)

/**
 * 收藏书籍
 */
book.post('/favorite/:bookId/add', bookController.addFavorite)

 /**
  * 取消收藏
  */
book.post('/favorite/:bookId/cancel', bookController.cancelFavorite)

/**
 * 搜索
 */
book.get('/search/:keyword', bookController.search)

module.exports = compose([book.routes(), book.allowedMethods()])
