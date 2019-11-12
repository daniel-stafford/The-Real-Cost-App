const expenseRouter = require('express').Router()
const Expense = require('../models/expense.model')
const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const moment = require('moment')

expenseRouter.post('/', async (request, response, next) => {
  const { title, price, uses, notes, creator } = request.body
  try {
    const expense = new Expense({
      title,
      price,
      uses,
      notes,
      creator
    })
    await expense.save()
    const savedExpense = await Expense.findOne({ title })
    const user = await User.findById(savedExpense.creator)
    user.createdExpenses = user.createdExpenses.concat(savedExpense.id)
    await user.save()
    response.status(201).json(savedExpense.populate('user'))
  } catch (error) {
    next(error)
  }
})

expenseRouter.get('/', (request, response, next) => {
  jwt.verify(request.token, process.env.JWT_SECRET, async (err, authUser) => {
    if (err) return response.status(403).send('Please log in')
    try {
      let expenses = await Expense.find({ creator: authUser.id })
      if (request.query.id) {
        expenses = expenses.filter(e => e.id === request.query.id)
      }
      response.status(200).json({ expenses, authUser })
    } catch (error) {
      next(error)
    }
  })

  expenseRouter.put('/:id', async (request, response, next) => {
    const id = request.params.id
    const body = request.body
    try {
      if (body.dateToAdd) {
        const expenseToUpdate = await Expense.findById(id)
        const uses = expenseToUpdate.uses.concat(body.dateToAdd)
        const updatedExpense = await Expense.findByIdAndUpdate(
          id,
          { $set: { uses } },
          { new: true }
        )
        return response.json(updatedExpense.toJSON())
      }

      if (request.body.dateToRemove) {
        const expenseToUpdate = await Expense.findById(id)
        const uses = expenseToUpdate.uses.filter(
          useDate =>
            moment(useDate).format('MMM Do YY') !==
            moment(body.dateToRemove).format('MMM Do YY')
        )
        const updatedExpense = await Expense.findByIdAndUpdate(
          id,
          { $set: { uses } },
          { new: true }
        )
        return response.json(updatedExpense.toJSON())
      }
      if (body.note) {
        const updatedExpense = await Expense.findByIdAndUpdate(
          id,
          { $push: { notes: body.note } },
          { new: true }
        )
        return response.json(updatedExpense.toJSON())
      }
    } catch (error) {
      next(error)
    }
  })

  expenseRouter.delete('/:id', async (request, response, next) => {
    const id = request.params.id
    const expenseToDelete = await Expense.findById(id)
    try {
      await Expense.findByIdAndDelete(id)
      response.json(expenseToDelete.toJSON())
    } catch (e) {
      next(e)
    }
    await Expense.findByIdAndDelete(id)
  })
})

module.exports = expenseRouter
