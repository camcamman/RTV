const mongoose = require("mongoose")
const express = require("express")
const morgon = require("morgan")
const app = express()
require('dotenv').config() 
const port = 8081

app.use(express.json())
app.use(morgon('dev'))

mongoose.set("strictQuery", false);

mongoose.connect('mongodb://127.0.0.1:27017/RTVdb')
. catch (error => console.log(error))
. then (() => console.log("connected to db"));

//routes 
app.use("/auth", require("./routes/authRouter"))
app.use("/comments", require("./routes/comments"))
app.use("/issue", require("./routes/issue"))
app.use("/user", require("./routes/user"))

//main err handling 
app.use((err, req, res, next) => {
    console.log(err)
    return res.send({errMsg: err.message})
})

//server turn on 
app.listen(port, () => {
    console.log("the server is on")
})