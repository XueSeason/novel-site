const { getInfo } = require('../service/account')

async function render (ctx) {
  const userInfo = await getInfo(ctx.user.sns, ctx.user.snsId)
  const days = parseInt((new Date() - userInfo.createdAt) / (24 * 60 * 60 * 1000), 10)
  await ctx.render('account', { user: userInfo, days })
}

module.exports = {
  render
}
