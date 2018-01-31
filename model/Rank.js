const Sequelize = require('sequelize')
const sequelize = require('../extend/sequelize')

const Rank = sequelize.define('rank', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  bookId: { type: Sequelize.INTEGER, field: 'book_id' },
  groupId: { type: Sequelize.INTEGER, field: 'group_id' }
}, {
  timestamps: false
})

module.exports = Rank
