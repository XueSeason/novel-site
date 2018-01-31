const Book = require('../../model/Book')
const Rank = require('../../model/Rank')
const Chapter = require('../../model/Chapter')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

async function rank () {
  const rank = await Rank.all()
  const recommend = []
  const hot = []
  const star = []
  for (const item of rank) {
    const book = await Book.findById(item.bookId)
    if (item.groupId === 0) {
      recommend.push(book)
    } else if (item.groupId === 1) {
      hot.push(book)
    } else if (item.groupId === 2) {
      star.push(book)
    }
  }
  return { recommend, hot, star }
}

async function booklist (page = 1) {
  const books = await Book.findAll({
    limit: 10,
    offset: (page - 1) * 10
  })
  return books
}

async function query (q) {
  const books = await Book.findAll({
    where: {
      status: { [Op.eq]: 0 },
      title: { [Op.like]: `%${q}%` }
    }
  })
  return books
}

async function find (id) {
  const book = await Book.findById(id)
  const chapters = await Chapter.findAll({
    attributes: ['id', 'bookId', 'title', 'order', 'point'],
    where: {
      bookId: { [Op.eq]: id },
      status: { [Op.eq]: 0 }
    }
  })
  return { book, chapters }
}

module.exports = {
  query,
  find,
  rank,
  booklist
}
