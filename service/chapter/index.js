const Chapter = require('../../model/Chapter')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

async function list (bookId) {
  const chapters = await Chapter.findAndCountAll({
    where: {
      bookId: { [Op.eq]: bookId },
      status: { [Op.eq]: 0 }
    }
  })
  return chapters
}

async function getInfo (id) {
  const chapter = await Chapter.findById(id)
  const preChapter = await Chapter.findOne({
    attributes: ['id', 'bookId', 'title', 'order', 'point'],
    where: {
      bookId: { [Op.eq]: chapter.bookId },
      order: { [Op.eq]: chapter.order - 1 }
    }
  })
  const nextChapter = await Chapter.findOne({
    attributes: ['id', 'bookId', 'title', 'order', 'point'],
    where: {
      bookId: { [Op.eq]: chapter.bookId },
      order: { [Op.eq]: chapter.order + 1 }
    }
  })

  return { chapter, pre: preChapter, next: nextChapter }
}

module.exports = {
  list,
  getInfo
}
