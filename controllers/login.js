/* eslint-disable no-mixed-spaces-and-tabs */
const loginRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user.model')

loginRouter.post('/', async (request, response) => {
  const body = request.body
  console.log('request.body in login', request.body)
  const user = await User.findOne({ username: body.username })
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(body.password, user.password)
  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }
  const userInToken = {
    username: user.username,
    id: user.id
  }

  const token = jwt.sign(userInToken, process.env.JWT_SECRET)

  response.status(200).send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter
