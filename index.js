const app = require('./app') // the actual Express app
const http = require('http')
const config = require('./utils/config')
const wakeUpDyno = require('./utils/wakeUpDyno')
const wakeDyno = require('woke-dyno')

const server = http.createServer(app) // instead of having Express create one for you), using http.CreateSever is useful if you want to reuse the HTTP server, for example to run socket.io within the same HTTP server instance:

app.listen(config.PORT, () => {
  console.log('app listening on port', config.PORT)
  // wakeUpDyno(config.DYNO_URL) // will start once server starts
  wakeDyno({
    url: DYNO_URL, // url string
    interval: 60000 * 25, // interval in milliseconds (1 minute in this example)
    startNap: [20, 0, 0, 0], // the time to start nap in UTC, as [h, m, s, ms] (05:00 UTC in this example)
    endNap: [06, 0, 0, 0] // time to wake up again, in UTC (09:59:59.999 in this example)
  }).start()
})
