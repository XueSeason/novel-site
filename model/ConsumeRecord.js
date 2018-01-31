const Sequelize = require('sequelize')
const sequelize = require('../extend/sequelize')

const ConsumeRecord = sequelize.define('consume_record', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  accountId: { type: Sequelize.INTEGER, field: 'account_id' },
  chapterId: { type: Sequelize.INTEGER, field: 'chapter_id' },
  points: { type: Sequelize.INTEGER },
  createdAt: { type: Sequelize.DATE, field: 'created_at', defaultValue: Sequelize.NOW }
}, {
  timestamps: false,
  indexes: [{
    name: 'specific_account_chapter',
    unique: true,
    fields: ['account_id', 'chapter_id']
  }]
})

module.exports = ConsumeRecord
