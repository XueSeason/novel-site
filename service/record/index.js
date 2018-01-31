const Account = require('../../model/Account')
const ConsumeRecord = require('../../model/ConsumeRecord')
const PayRecord = require('../../model/PayRecord')

async function deductPoint (accountId, chapterId, point) {
  const hasConsumed = await ConsumeRecord.findOne({ where: { accountId, chapterId } })
  if (hasConsumed) return true

  const user = await Account.find({ where: { id: accountId, status: 0 } })
  if (user.points >= point) {
    await ConsumeRecord.create({ accountId, chapterId, points: point })
    await user.update({ points: user.points - point })
    return true
  } else {
    return false
  }
}

async function charge (accountId, chargeId, amount) {
  const user = await Account.findById(accountId)
  let point = amount * 100
  if (amount === 5) {
    point += 50
  } else if (amount === 15) {
    point += 150
  } else if (amount === 20) {
    point += 300
  } else if (amount === 30) {
    point += 500
  } else if (amount === 40) {
    point += 1000
  } else if (amount === 50) {
    point += 2000
  }
  await user.update({ points: user.points + point })
  await PayRecord.create({ accountId, chargeId, amount })
}

async function getConsumeList (accountId) {
  const rows = await ConsumeRecord.findAll({ where: { accountId } })
  return rows
}

async function getPayList (accountId) {
  const rows = await PayRecord.findAll({ where: { accountId } })
  return rows
}

module.exports = {
  getConsumeList,
  getPayList,
  deductPoint,
  charge
}
