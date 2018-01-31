const path = require('path')

const mysql = {
  database: 'novel_site',
  username: 'root',
  password: '',
  host: '',
  port: 3306
}

const viewPath = path.join(__dirname, '../view/')
const partialsPath = path.join(__dirname, '../view/partial/')
const publicPath = path.join(__dirname, '../public/')

const sns = {
  fb: {
    clientId: '',
    clientSecret: '',
    callbackUri: 'http://book.sarahhaa.com/v1/login/fb/callback'
  }
}

const secret = 'f9ab4ba433'

const payment = {
  stripe: {
    publishableKey: '',
    secretKey: ''
  }
}

module.exports = {
  viewPath,
  publicPath,
  partialsPath,
  mysql,
  sns,
  secret,
  payment
}
