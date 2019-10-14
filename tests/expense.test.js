const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Expense = require('../models/expense.model')

const initialExpenses = [
  {
    title: 'Stuff!',
    price: 300,
    notes: 'here are some notes'
  }
]
beforeEach(async () => {
  await Expense.deleteMany({})
  const expense = new Expense(initialExpenses[0])
  console.log('expense', expense)
  await expense.save()
})

describe('addition of a new expense', () => {
  afterAll(async () => {
    await mongoose.connection.close()
  })
  test('all notes are returned', async () => {
    const response = await api.get('/api/expenses')
    expect(response.body.length).toBe(initialExpenses.length)
  })
})
