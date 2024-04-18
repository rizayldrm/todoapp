const express = require("express")
const app = express()
const morgan = require("morgan")
const cors = require("cors")
const listRouter = require("./routes/itemRouter")

app.use(morgan("common"))
app.use(cors())
app.use(express.json())
app.use(listRouter)

var port = 8080
app.listen(port, () => { console.log("Proje " + port + " portu altında çalışıyor | http://localhost:" + port + " | Durdurmak için Ctrl+C") })

