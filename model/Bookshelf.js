const Sequelize = require('sequelize')
const sequelize = require('../extend/sequelize')

const Bookshelf = sequelize.define('bookshelf', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  accountId: { type: Sequelize.INTEGER, field: 'account_id' },
  bookId: { type: Sequelize.INTEGER, field: 'book_id' },
  lastReadChapterId: { type: Sequelize.INTEGER, field: 'last_read_chapter_id' },
  lastReadTime: { type: Sequelize.DATE, field: 'last_read_time', defaultValue: Sequelize.NOW }
}, {
  timestamps: false,
  indexes: [{
    name: 'specific_account_book',
    unique: true,
    fields: ['account_id', 'book_id']
  }]
})

module.exports = Bookshelf
