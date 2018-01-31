const Account = require('../../model/Account')

async function checkin (sns, snsId, username) {
  const user = await Account.findOrCreate({ where: { sns, snsId }, defaults: { sns, snsId, username } })
  .spread((user, created) => {
    return user.get({ plain: true })
  })
  return user
}

async function getInfo (sns, snsId) {
  const user = await Account.find({ where: { sns, snsId, status: 0 } })
  return user
}

module.exports = {
  checkin,
  getInfo
}
