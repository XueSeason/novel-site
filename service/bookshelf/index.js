const Book = require('../../model/Book')
const Bookshelf = require('../../model/Bookshelf')

async function add (accountId, bookId, lastReadChapterId, lastReadTime) {
  const bookshelf = await Bookshelf.findOrCreate({
    where: { accountId, bookId },
    defaults: { accountId, bookId }
  }).spread((bookshelf, craeted) => {
    return bookshelf
  })
  if (lastReadChapterId && lastReadTime) {
    await bookshelf.update({
      lastReadChapterId,
      lastReadTime
    })
  }
  return bookshelf.get({ plain: true })
}

async function remove (accountId, bookId) {
  const res = await Bookshelf.destroy({ where: { accountId, bookId } })
  return res === 1
}

async function getInfo (accountId, bookId) {
  const bookshelf = await Bookshelf.findOne({ where: { accountId, bookId } })
  return bookshelf
}

async function list (accountId) {
  const arr = await Bookshelf.findAll({ where: { accountId } })
  const res = []
  for (const record of arr) {
    res.push(await Book.findOne({ where: { id: record.bookId } }))
  }
  return res
}

module.exports = {
  add,
  list,
  remove,
  getInfo
}
