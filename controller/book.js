const bookService = require('../service/book/')
const bookshelfService = require('../service/bookshelf')
const accountService = require('../service/account')

async function render (ctx) {
  const bookInfo = await bookService.find(ctx.params.bookId)
  let firstChapterId
  if (bookInfo.chapters.length > 0) {
    firstChapterId = bookInfo.chapters[0].id
  }
  let favorite = false
  if (ctx.user) {
    const user = await accountService.getInfo(ctx.user.sns, ctx.user.snsId)
    const bookshelfInfo = await bookshelfService.getInfo(user.id, ctx.params.bookId)
    if (bookshelfInfo) {
      firstChapterId = bookshelfInfo.lastReadChapterId
      favorite = true
    }
  }
  await ctx.render('book', Object.assign(bookInfo, { user: ctx.user, firstChapterId, favorite }))
}

async function getRank (ctx) {
  ctx.body = await bookService.rank()
}

async function getBook (ctx) {
  ctx.body = await bookService.find(ctx.params.bookId)
}

async function getList (ctx) {
  const page = (ctx.query.page || 1) - 0
  const books = await bookService.booklist(page)
  let prePage = 0
  let nextPage = 0
  if (page > 1) {
    prePage = page - 1
  }
  if (books.length === 10) {
    nextPage = page + 1
  }
  await ctx.render('booklist', { user: ctx.user, books, prePage, nextPage })
}

async function addFavorite (ctx) {
  if (ctx.user && ctx.request.body.bookId) {
    const user = await accountService.getInfo(ctx.user.sns, ctx.user.snsId)
    await bookshelfService.add(user.id, ctx.request.body.bookId)
    ctx.body = { success: true }
  } else {
    ctx.body = { message: 'auth expired', success: false }
  }
}

async function cancelFavorite (ctx) {
  if (ctx.user) {
    ctx.body = { success: true }
  } else {
    ctx.body = { message: 'auth expired', success: false }
  }
}

async function search (ctx) {
  const keyword = ctx.params.keyword
  const result = await bookService.query(keyword)
  ctx.body = result
}

module.exports = {
  getRank,
  getBook,
  render,
  search,
  getList,
  addFavorite,
  cancelFavorite
}
