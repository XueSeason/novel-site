const Sequelize = require('sequelize')
const sequelize = require('../extend/sequelize')

const Chapter = sequelize.define('chapter', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  bookId: {
    type: Sequelize.INTEGER,
    field: 'book_id'
  },
  title: { type: Sequelize.STRING },
  content: { type: Sequelize.TEXT },
  order: { type: Sequelize.INTEGER },
  point: { type: Sequelize.INTEGER, defaultValue: 0 },
  status: { type: Sequelize.INTEGER, defaultValue: 0 },
  createdAt: { type: Sequelize.DATE, field: 'created_at', defaultValue: Sequelize.NOW }
}, {
  timestamps: false
})

module.exports = Chapter
