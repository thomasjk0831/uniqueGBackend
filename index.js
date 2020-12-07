const server = require("./api/server.js");
const wakeUpDyno = require('./wokeDyno.js')
const port = process.env.PORT || 5000

const DYNO_URL = "https://backend-uniquegifts.herokuapp.com/"

server.listen(port, () => {
    wakeUpDyno(DYNO_URL)
    console.log("api up")
})