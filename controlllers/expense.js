const expenseRouter = require('express').Router()
const Expense = require('../models/expense.model')

expenseRouter.get('/', async (request, response) => {
  try {
    const expenses = await Expense.find({})
      .populate('user', {
        username: 1,
        id: 1
      })
      .populate('comments', {
        comment: 1
      })
    response.json(expenses)
  } catch (error) {
    console.log(error)
  }
})

expenseRouter.post('/', async (request, response, next) => {
  const { title, price, uses, notes } = request.body

  try {
    const expense = new Expense({
      title,
      price,
      uses,
      notes
    })
    const savedExpense = await expense.save()
    response.status(201).json(savedExpense)
  } catch (error) {
    console.log(error)
  }
})

module.exports = expenseRouter
