const Sequelize = require('sequelize')
const sequelize = require('../extend/sequelize')

const PayRecord = sequelize.define('pay_record', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  accountId: { type: Sequelize.INTEGER },
  chargeId: { type: Sequelize.STRING },
  amount: { type: Sequelize.INTEGER },
  createdAt: { type: Sequelize.DATE, field: 'created_at', defaultValue: Sequelize.NOW }
}, {
  timestamps: false
})

module.exports = PayRecord
