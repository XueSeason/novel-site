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
  await next()
}

module.exports = user
