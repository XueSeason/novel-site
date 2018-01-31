const rp = require('request-promise')
const moment = require('moment')
const { sns: { fb } } = require('../config')
const { encrypt } = require('../extend/aes')
const { payment } = require('../config')
const stripe = require('stripe')(payment.stripe.secretKey)
const { checkin, getInfo } = require('../service/account')
const bookshelfService = require('../service/bookshelf')
const recordService = require('../service/record')

async function mockLogin (ctx) {
  const account = {
    id: '142040693264264',
    sns: ctx.params.sns,
    name: 'XueSeason',
    maxAge: 24 * 60 * 60 * 1000
  }
  await checkin(account.sns, account.id, account.name)
  const text = encrypt(JSON.stringify({ snsId: account.id, username: account.name, sns: account.sns, expire: new Date().valueOf() + account.maxAge + 60 * 1000 }))
  ctx.cookies.set('user', text, { maxAge: account.maxAge, httpOnly: true, overWrite: false })
  ctx.status = 302
  ctx.redirect('/')
}

async function logout (ctx) {
  ctx.cookies.set('user', null)
  ctx.status = 302
  ctx.redirect('/')
}

async function loginCallback (ctx) {
  const code = ctx.query.code
  const state = ctx.query.state
  const uri = `https://graph.facebook.com/v2.11/oauth/access_token?client_id=${fb.clientId}&redirect_uri=${fb.callbackUri}&client_secret=${fb.clientSecret}&code=${code}`
  const { access_token: accessToken, expires_in: expire } = await rp({ uri, json: true })
  const { name, id } = await rp({ uri: `https://graph.facebook.com/me?access_token=${accessToken}`, json: true })
  const text = encrypt(JSON.stringify({ id, sns: 'fb' }))
}

async function renderPayment (ctx) {
  const userInfo = await getInfo(ctx.user.sns, ctx.user.snsId)
  await ctx.render('payment', { user: userInfo, publishableKey: payment.stripe.publishableKey })
}

async function renderBookshelf (ctx) {
  const userInfo = await getInfo(ctx.user.sns, ctx.user.snsId)
  const bookList = await bookshelfService.list(userInfo.id)
  await ctx.render('bookshelf', { user: ctx.user, bookList })
}

async function renderLogin (ctx) {
  await ctx.render('login')
}

async function renderSearch (ctx) {
  await ctx.render('search', { user: ctx.user })
}

async function renderRecord (ctx) {
  const userInfo = await getInfo(ctx.user.sns, ctx.user.snsId)
  if (ctx.params.option === 'consume') {
    const rows = await recordService.getConsumeList(userInfo.id)
    const records = rows.map(item => ({ left: moment(item.createdAt).format('YYYY-MM-DD'), right: `消费 ${item.points} 金币` }))
    await ctx.render('record', { user: ctx.user, title: '消费记录', records })
  } else {
    const rows = await recordService.getPayList(userInfo.id)
    const records = rows.map(item => ({ left: moment(item.createdAt).format('YYYY-MM-DD'), right: `充值 ${item.amount} 元` }))
    await ctx.render('record', { user: ctx.user, title: '充值记录', records })
  }
}

async function paymentHandler (ctx) {
  if (ctx.user) {
    const { price, stripeToken: token } = ctx.request.body
    const { status, id: chrageId } = await new Promise((resolve, reject) => {
      stripe.charges.create({
        amount: price * 100,
        currency: 'twd',
        description: token,
        source: token
      }, function (err, charge) {
        if (err) {
          reject(err)
        } else {
          resolve(charge)
        }
      })
    })
    if (status === 'succeeded') {
      const userInfo = await getInfo(ctx.user.sns, ctx.user.snsId)
      await recordService.charge(userInfo.id, chrageId, parseInt(price, 10))
    }
  }
  ctx.status = 302
  ctx.redirect('/payment')
}

module.exports = {
  loginCallback,
  renderPayment,
  renderBookshelf,
  renderLogin,
  renderSearch,
  renderRecord,
  paymentHandler,
  logout,
  mockLogin
}
