const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Expense = require('../models/expense.model')
const helper = require('./test_data')

const initialExpenses = helper.initialExpenses

beforeEach(async () => {
  await Expense.deleteMany({})
})

describe('get expenses', () => {
  test('Check if tothrow method works', () => {
    const t = () => {
      throw new TypeError()
    }
    expect(t).toThrow(TypeError)
  })
  test('fails if user not logged in ', async () => {
    const response = await api.get('/api/expenses')
    expect(response.status).toBe(403)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
