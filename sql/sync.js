const Account = require('../model/Account')
const Book = require('../model/Book')
const Chapter = require('../model/Chapter')
const BookShelf = require('../model/BookShelf')
const ConsumeRecord = require('../model/ConsumeRecord')
const PayRecord = require('../model/PayRecord')
const Rank = require('../model/Rank')

;(async function () {
  await Account.sync()
  await Book.sync()
  await Chapter.sync()
  await BookShelf.sync()
  await ConsumeRecord.sync()
  await PayRecord.sync()
  await Rank.sync()
  process.exit(0)
})()
