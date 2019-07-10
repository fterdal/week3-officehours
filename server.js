const express = require('express')
const path = require('path')
const morgan = require('morgan')
const { Cookie, Monster } = require('./database')
const app = express()

app.use(morgan('dev'))

app.get('/message', (req, res, next) => {
  res.json({
    message: 'here is a message from the server',
  })
})

app.get('/api/cookies', async (req, res, next) => {
  try {
    // setTimeout( async () => res.json( await Cookie.findAll()), 1000 )
    res.json(await Cookie.findAll())
  } catch (err) {
    next(err)
  }
})

app.get('/api/cookies/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const cookie = await Cookie.findByPk(id, {
      include: [{ model: Monster }],
    })
    res.json(cookie)
  } catch (err) {
    next(err)
  }
})

app.get('/api/monsters', async (req, res, next) => {
  try {
    res.json(await Monster.findAll())
  } catch (err) {
    next(err)
  }
})

app.get('/api/monsters/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const monster = await Monster.findByPk(id, {
      include: [{ model: Cookie }],
    })
    res.json(monster)
  } catch (err) {
    next(err)
  }
})

app.use(express.static('public'))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'))
}) // Send index.html for any other requests


const PORT = 8080
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
