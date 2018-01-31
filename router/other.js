const Router = require('koa-router')
const compose = require('koa-compose')
const otherController = require('../controller/other')
const auth = require('../middleware/auth')

const other = new Router()

other.get('/bookshelf', auth, otherController.renderBookshelf)

other.get('/payment', auth, otherController.renderPayment)

other.post('/payment', auth, otherController.paymentHandler)

other.get('/login', otherController.renderLogin)

other.get('/search', otherController.renderSearch)

other.get('/record/:option', auth, otherController.renderRecord)

module.exports = compose([other.routes(), other.allowedMethods()])
