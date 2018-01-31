const crypto = require('crypto')
const { secret } = require('../config')
const algorithm = 'aes-256-ctr'

function encrypt (text) {
  const cipher = crypto.createCipher(algorithm, secret)
  let crypted = cipher.update(text, 'utf8', 'hex')
  crypted += cipher.final('hex')
  return crypted
}

function decrypt (text) {
  const decipher = crypto.createDecipher(algorithm, secret)
  let dec = decipher.update(text, 'hex', 'utf8')
  dec += decipher.final('utf8')
  return dec
}

module.exports = { encrypt, decrypt }

