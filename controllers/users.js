const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user.model')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    title: 1,
    notes: 1,
    uses: 1,
    id: 1
  })
  response.json(users)
})

usersRouter.post('/', async (request, response, next) => {
  const body = request.body
  if (body.password.length < 3 || body.password.length < 3)
    return response.status(400).json({
      error: 'password and username must be at least 3 characters long'
    })
  if (await User.findOne({ username: body.username })) {
    console.log(
      'user find one',
      await User.findOne({ username: body.username })
    )
    return response.status(400).json({
      error: 'That username already exists'
    })
  }
  try {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      email: body.email,
      password: passwordHash
    })
    const savedUser = await user.save()
    response.json(savedUser)
  } catch (exception) {
    console.log('exception in login is firing')
    next(exception)
  }
})

module.exports = usersRouter
