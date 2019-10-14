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
  await Note.deleteMany({})

  const expense = new expense(initialExpenses[0])
  await expense.save()
})

test('all notes are returned', async () => {
  const response = await api.get('/api/notes')
  expect(response.body.length).toBe(initialNotes.length)
})
