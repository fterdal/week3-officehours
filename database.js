const Sequelize = require('sequelize')

const db = new Sequelize('postgres://localhost:5432/cookies', {
  logging: false,
})

const Cookie = db.define('cookie', {
  name: Sequelize.STRING,
})

const Monster = db.define('monster', {
  name: Sequelize.STRING,
})

Monster.belongsToMany(Cookie, { through: 'cookie-monster' })
Cookie.belongsToMany(Monster, { through: 'cookie-monster' })

const seed = async () => {
  const seedCookies = [
    { name: 'Chocolate Chip 🍪' },
    { name: 'OREO' },
    { name: 'Oatmeal Raisin' },
  ]
  const seedMonsters = [
    { name: 'Bigfoot' },
    { name: 'Dracula' },
    { name: 'Jabba' },
  ]
  const [ choco, oreo, oatmeal ] = await Cookie.bulkCreate(seedCookies, { returning: true })
  const [ bigfoot, dracula, jabba ] = await Monster.bulkCreate(seedMonsters, { returning: true })

  await bigfoot.addCookie(oatmeal)
  await dracula.addCookie(oreo)
  await jabba.addCookie(choco)
  await jabba.addCookie(oatmeal)
}

const connect = async () => {
  try {
    await db.sync({ force: true })
    console.log('CONNECTED!')
    await seed()
    console.log('SEEDED!')
  } catch (err) {
    console.log(err)
  }
}

connect()

module.exports = {
  db,
  Cookie,
  Monster,
}
