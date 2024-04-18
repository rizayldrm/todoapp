const express = require("express")
const router = express.Router()
const path = require("path")
const con = require("../con")

router.post("/api/editItem/:id",(req,res)=>{
    var query = "UPDATE list SET itemName = ?, itemDescription = ? WHERE id = ?"
    con.query(query,[
        req.body.itemName,
        req.body.itemDesc,
        req.params.id
    ],err => {
        if(err){
            console.error("MySQL query error: "+err)
            res.json({message: "Error, something went wrong",status: 404}).status(404)
            return
        }

        res.send({message:"İşlem başarı ile gerçekleştirildi"})
    })
})

router.post("/api/deleteItem", (req, res) => {
    var query = "DELETE FROM list WHERE id=?"
    con.query(query, [req.body.itemId], (err, result) => {
        if (err) {
            console.error("MySQL query error: " + err)
            res.json({ message: "Error, something went wrong", status: "404", result: result }).status(404)
            return
        }
        res.send({ message: "Deleted item successfully" })
    })
})

router.post("/api/newItem", (req, res) => {
    var query = "INSERT INTO list (itemName, itemDescription) VALUES (?, ?)"
    con.query(query, [req.body.itemName, req.body.itemDesc], (err) => {
        if (err) {
            console.error("MySQL query error: " + err)
            res.json({ message: "Error, something went wrong", status: "404" }).status(404)
            return
        }
        res.send({ message: "New item added successfully" })
    })
})

router.get("/api/listItems/:id", (req, res) => {
    var query = "SELECT * FROM list WHERE id=?"
    con.query(query, [req.params.id], (err, result) => {
        if (err) {
            console.error("MySQL query error: " + err)
            con.destroy()
            return
        } else {
            res.send({ db: result })
        }
    })
})

router.get("/api/listItems",(req,res)=>{
    var query = "SELECT * FROM list"
        con.query(query, (err, result) => {
            if (err) {
                console.error("MySQL query error: " + err)
                con.destroy()
                return
            } else {
                res.send({ db: result })
            }
        })
})

router.get("*", (req, res) => {
    res.send({
        message: "There is no such page",
        status: "404"
    }).status(404)
})

module.exports = router