require('dotenv').config()
const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const axios = require('axios')
const cors = require('cors')

const app = express()
app.use(cors())

const url = process.env.MONGODB_URI

mongoose
  .set('useCreateIndex', true)
  .set('useFindAndModify', false)
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to MongoDB!')
  })
  .catch(error => {
    console.log('error connection to MongoDB:', error.message)
  })

app.get('/api', async (req, res) => {
  const user = req.query.user || 'daniel-stafford'
  try {
    const response = await axios.get(`https://api.github.com/users/${user}`)
    res.json({ user: response.data })
  } catch (e) {
    console.log('error with github get', e.message)
  }
})

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 1234

app.listen(PORT, () => {
  console.log('listening on port', PORT)
})
