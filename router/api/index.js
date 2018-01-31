const compose = require('koa-compose')
const book = require('./book')
const chapter = require('./chapter')
const record = require('./record')
const other = require('./other')

module.exports = compose([book, chapter, record, other])
