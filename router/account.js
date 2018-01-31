const Router = require('koa-router')
const compose = require('koa-compose')
const accountController = require('../controller/account')
const auth = require('../middleware/auth')

const account = new Router({
  prefix: '/account'
})

account.get('/', auth, accountController.render)

module.exports = compose([account.routes(), account.allowedMethods()])
