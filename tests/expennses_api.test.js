const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Expense = require('../models/expense.model')
const helper = require('./test_helper')

const initialExpenses = helper.initialExpenses

beforeEach(async () => {
  await Expense.deleteMany({})
  const expense = new Expense(initialExpenses[0])
  await expense.save()
})

describe('addition of a new expense', () => {})
afterAll(async () => {
  await mongoose.connection.close()
})
test('all expenses are returned', async () => {
  const response = await api.get('/api/expenses')
  expect(response.body.length).toBe(initialExpenses.length)
})
test('new expense id is formatted correctly', async () => {
  const response = await api.get('/api/expenses')
  expect(response.body[0].id).toBeDefined()
  expect(response.body[0]._id).not.toBeDefined()
})
