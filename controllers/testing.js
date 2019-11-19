const router = require('express').Router()
const Expense = require('../models/expense.model')
const User = require('../models/user.model')

router.post('/reset', async (request, response) => {
  await Expense.deleteMany({})
  await User.deleteMany({})
  response.status(204).end()
})

module.exports = router
