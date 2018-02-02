const { decrypt } = require('../extend/aes')

async function user (ctx, next) {
  if (ctx.cookies.get('user')) {
    try {
      const { snsId, sns, username, expire = 0 } = JSON.parse(decrypt(ctx.cookies.get('user')))
      const timestamp = new Date().valueOf()
      if (expire > timestamp) {
        ctx.user = { snsId, sns, username }
      } else {
        ctx.cookies.set('user', null)
      }
    } catch (error) {
      console.error(error)
    }
  }
  if (ctx.cookies.get('refer')) {
    ctx.refer = ctx.cookies.get('refer')
  }
  await next()
  if (ctx.url !== '/login' && ctx.url !== '/payment') {
    ctx.cookies.set('refer', ctx.url, { httpOnly: true, overWrite: false })
  }
}

module.exports = user
