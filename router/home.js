const Router = require('koa-router')
const compose = require('koa-compose')
const homeController = require('../controller/home')

const home = new Router()

home.get('/', homeController.render)

module.exports = compose([home.routes(), home.allowedMethods()])
