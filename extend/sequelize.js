const Sequelize = require('sequelize')
const { mysql: { database, username, password, host, port } } = require('../config')

const sequelize = new Sequelize(database, username, password, {
  host,
  port,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

module.exports = sequelize
