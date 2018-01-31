const Router = require('koa-router')
const compose = require('koa-compose')

const record = new Router({
  prefix: '/v1/record'
})

/**
 * 支付记录查询（要求登录）
 */
record.get('/payment', async ctx => {

})

/**
 * 消费记录查询（要求登录）
 */
record.get('/consume', async ctx => {

})

module.exports = compose([record.routes(), record.allowedMethods()])
