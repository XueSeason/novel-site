const bookService = require('../service/book/')

async function render (ctx) {
  const rank = await bookService.rank()
  const recommendThree = rank.recommend.slice(0, 3)
  const recommendOther = rank.recommend.slice(3, 10)
  const hotOne = rank.hot.slice(0, 1)
  const hotOther = rank.hot.slice(1, 10)
  await ctx.render('home', { user: ctx.user, recommendThree, recommendOther, hotOne, hotOther })
}

module.exports = {
  render
}
