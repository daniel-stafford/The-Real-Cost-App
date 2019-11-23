const app = require('./app') // the actual Express app
const http = require('http')
const config = require('./utils/config')
const wakeUpDyno = require('./utils/wakeUpDyno')

const server = http.createServer(app) // instead of having Express create one for you), using http.CreateSever is useful if you want to reuse the HTTP server, for example to run socket.io within the same HTTP server instance:

app.listen(config.PORT, () => {
  console.log('app listening on port', config.PORT)
  wakeUpDyno(config.DYNO_URL) // will start once server starts
})
