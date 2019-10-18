/* eslint-disable no-mixed-spaces-and-tabs */
const loginRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user.model')

loginRouter.post('/', async (request, response) => {
  const body = request.body
  const user = await User.findOne({ username: body.username })
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(body.password, user.password)
  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'Invalid username and/or password.'
    })
  }
  const { id, username } = user
  const userInToken = {
    username,
    id
  }

  jwt.sign(userInToken, process.env.JWT_SECRET, (err, token) => {
    if (err) throw Error
    return response.status(200).send({ token, username, id })
  })
})

module.exports = loginRouter
