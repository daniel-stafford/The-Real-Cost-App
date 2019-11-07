const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user.model')
const nodemailer = require('nodemailer')
var smtpTransport = require('nodemailer-smtp-transport')

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
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD
      }
    })
    const mailOptions = {
      from: 'realcostapp@gmail.com',
      to: body.email,
      subject: 'Welcome to the Real Cost App',
      html: `<h3>Great, youv'e signed up for the Real Cost App!</h3> <p>Go to https://stafford-real-cost.herokuapp.com/login and log in! </p><p>If you have any questions or comments, just reply to this email or email me at realcostapp@gmail.com. </p> <p>Thanks!</p>  <p>-Daniel</p>`
    }
    transporter.sendMail(mailOptions, (err, data) => {
      if (err) return console.log('error with nodemailer', err)
      console.log('email sent!')
    })
  } catch (exception) {
    console.log('exception in login is firing')
    next(exception)
  }
})

module.exports = usersRouter
