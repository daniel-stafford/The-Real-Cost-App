const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const cors = require('cors')
const config = require('./utils/config')

const expenseRouter = require('./controlllers/expense')

const app = express()
app.use(cors())
app.use(express.json()) // no longer need bodyparse, included in express

mongoose
  .set('useCreateIndex', true)
  .set('useFindAndModify', false)
  .connect(config.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to MongoDB!')
  })
  .catch(error => {
    console.log('error connection to MongoDB:', error.message)
  })

// app.get('/api', async (req, res) => {
//   const user = req.query.user || 'daniel-stafford'
//   try {
//     const response = await axios.get(`https://api.github.com/users/${user}`)
//     res.json({ user: response.data })
//   } catch (e) {
//     console.log('error with github get', e.message)
//   }
// })

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

app.use('/api/expenses', expenseRouter)

app.listen(config.PORT, () => {
  console.log('listening on port', config.PORT)
})
