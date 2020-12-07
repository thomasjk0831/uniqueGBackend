const server = require("./api/server.js");
const wakeUpDyno = require('wokeDyno.js')
const port = process.env.PORT || 5000

const DYNO_URL = "https://uniquegifts-3budisus1.vercel.app/"

server.listen(port, () => {
    wakeUpDyno(DYNO_URL)
})