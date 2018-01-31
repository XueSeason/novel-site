const hbs = require('koa-hbs')
const moment = require('moment')
const { viewPath, partialsPath } = require('../config')

hbs.registerHelper('safeHTML', text => {
  return new hbs.SafeString(text)
})

hbs.registerHelper('formatPoint', text => {
  return parseFloat(Math.round(text * 100) / 100).toFixed(2)
})

hbs.registerHelper('formatDate', text => {
  return moment(text).format('YYYY-MM-DD hh:mm:ss')
})

module.exports = hbs.middleware({
  viewPath,
  partialsPath,
  extname: '.html'
})
