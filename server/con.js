const mysql = require("mysql")
const config = require("./config")

const con = mysql.createConnection(config.mysql)

con.connect(err => {
    if(err){
        console.error("MySQL connection Error :"+err)
        return
    } else {
        console.log("MySQL database connected")
    }
})

module.exports = con