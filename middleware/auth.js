async function auth (ctx, next) {
  if (ctx.user) {
    await next()
  } else {
    ctx.status = 302
    await ctx.redirect('/login')
  }
}

module.exports = auth
