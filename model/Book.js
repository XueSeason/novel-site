const Sequelize = require('sequelize')
const sequelize = require('../extend/sequelize')

const Book = sequelize.define('book', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: { type: Sequelize.STRING },
  writer: { type: Sequelize.STRING },
  cover: { type: Sequelize.STRING, allowNull: true },
  desc: { type: Sequelize.STRING(500), allowNull: true },
  tag: { type: Sequelize.STRING, allowNull: true },
  status: { type: Sequelize.INTEGER, defaultValue: 0 },
  createdAt: { type: Sequelize.DATE, field: 'created_at', defaultValue: Sequelize.NOW }
}, {
  timestamps: false
})

module.exports = Book
