require('dotenv').config()

const PORT = process.env.PORT
let URI = process.env.MONGODB_URI
const DYNO_URL = 'https://stafford-real-cost.herokuapp.com/'

if (process.env.NODE_ENV === 'test') {
  URI = process.env.TEST_MONGODB_URI
}

module.exports = {
  URI,
  PORT,
  DYNO_URL
}
