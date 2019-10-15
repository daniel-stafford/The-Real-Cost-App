const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Expense = require('../models/expense.model')
const helper = require('./test_data')

const initialExpenses = helper.initialExpenses

beforeEach(async () => {
  await Expense.deleteMany({})
  const expense = new Expense(initialExpenses[0])
  await expense.save()
})

describe('addition of a new expense', () => {
  test('all expenses are returned', async () => {
    const response = await api.get('/api/expenses')
    expect(response.body.length).toBe(initialExpenses.length)
  })
  test('new expense id as response is formatted correctly', async () => {
    const response = await api.get('/api/expenses')
    expect(response.body[0].id).toBeDefined()
    expect(response.body[0]._id).not.toBeDefined()
  })
})

afterAll(() => {
  mongoose.connection.close()
})
