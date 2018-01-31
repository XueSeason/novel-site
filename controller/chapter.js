const chapterService = require('../service/chapter')
const accountService = require('../service/account')
const bookshelfService = require('../service/bookshelf')
const recordService = require('../service/record/')
const bookService = require('../service/book')

async function render (ctx) {
  const chapterInfo = await chapterService.getInfo(ctx.params.chapterId)
  if (chapterInfo.chapter.point > 0) {
    if (ctx.user) {
      const userInfo = await accountService.getInfo(ctx.user.sns, ctx.user.snsId)
      if (chapterInfo.chapter.point > userInfo.points) {
        ctx.status = 302
        ctx.redirect('/payment')
        return
      } else {
        const success = await recordService.deductPoint(userInfo.id, ctx.params.chapterId, chapterInfo.chapter.point)
        if (!success) {
          ctx.status = 302
          ctx.redirect('/payment')
          return
        }
      }
    } else {
      ctx.status = 302
      ctx.redirect('/login')
      return
    }
  }
  // 记录阅读历史
  if (ctx.user) {
    const userInfo = await accountService.getInfo(ctx.user.sns, ctx.user.snsId)
    await bookshelfService.add(userInfo.id, chapterInfo.chapter.bookId, ctx.params.chapterId, new Date())
  }
  const bookInfo = await bookService.find(chapterInfo.chapter.bookId)
  await ctx.render('chapter', Object.assign(chapterInfo, { book: bookInfo.book, user: ctx.user }))
}

async function getInfo (ctx) {
  if (ctx.user) {
    ctx.body = { success: false, message: 'auth expired' }
  } else {
    ctx.body = await chapterService.getInfo(ctx.params.chapterId)
  }
}

async function purchase (ctx) {
  if (ctx.user) {
    ctx.body = { success: false, message: 'auth expired' }
  } else {
    const userInfo = await accountService.getInfo(ctx.user.sns, ctx.user.snsId)
    const chapterInfo = await chapterService.getInfo(ctx.params.chapterId)
    if (userInfo.points < chapterInfo.chapter.point) {
      ctx.status = 302
      ctx.redirect('/payment')
    } else {
      await recordService.deductPoint(userInfo.id, ctx.params.chapterId, chapterInfo.chapter.point)
    }
  }
}

module.exports = {
  getInfo,
  purchase,
  render
}
