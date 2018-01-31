const compose = require('koa-compose')
const api = require('./api')
const home = require('./home')
const book = require('./book')
const chapter = require('./chapter')
const account = require('./account')
const other = require('./other')

module.exports = compose([
  home,
  book,
  chapter,
  account,
  other,
  api
])
