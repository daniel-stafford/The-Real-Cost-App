const expenseRouter = require('express').Router()
const Expense = require('../models/expense.model')
const jwt = require('jsonwebtoken')
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
    next(error)
  }
})
expenseRouter.get('/', (request, response, next) => {
  jwt.verify(request.token, process.env.JWT_SECRET, async (err, authUser) => {
    if (err) return response.status(403).send('Please log in')
    try {
      const expenses = await Expense.find({})
        .populate('user', {
          username: 1,
          id: 1
        })
        .populate('comments', {
          comment: 1
        })
      response.json(expenses, authUser)
    } catch (error) {
      console.log(error)
    }
  })

  expenseRouter.put('/:id', async (request, response, next) => {
    const expense = {
      uses: request.body.uses
    }
    const updatedExpense = await Expense.findByIdAndUpdate(
      request.params.id,
      expense,
      {
        new: true
      }
    )
    try {
      response.json(updatedExpense.toJSON())
    } catch (error) {
      console.log(error)
    }
  })

  expenseRouter.delete('/:id', async (request, response, next) => {
    const id = request.params.id
    const expenseToDelete = await Expense.findById(id)
    try {
      await Expense.findByIdAndDelete(id)
      response.json(expenseToDelete.toJSON())
    } catch (e) {
      console.log('something went wrong with delete', e.message)
    }
    await Expense.findByIdAndDelete(id)
  })
})

module.exports = expenseRouter
