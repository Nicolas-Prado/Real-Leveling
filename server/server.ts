import server from "./config/express"
const port = 22194
//import routes = require("./api/routes")

server.get('/', (req, res) => {
    res.send("El Psy Kongroo!")
})

server.listen(port, () => {
    console.log("Server running in port: " + port)
})