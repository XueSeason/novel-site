const Sequelize = require('sequelize')
const sequelize = require('../extend/sequelize')

const Account = sequelize.define('account', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  sns: { type: Sequelize.STRING },
  snsId: { type: Sequelize.STRING, field: 'sns_id' },
  username: { type: Sequelize.STRING(50) },
  points: { type: Sequelize.INTEGER, defaultValue: 0 },
  status: { type: Sequelize.INTEGER, defaultValue: 0 },
  createdAt: { type: Sequelize.DATE, field: 'created_at', defaultValue: Sequelize.NOW }
}, {
  timestamps: false,
  indexes: [{
    name: 'specific_account',
    unique: true,
    fields: ['sns', 'sns_id']
  }]
})

module.exports = Account
