const express = require("express")
const app = express()
require('dotenv').config()

const mongoose = require('mongoose')
const {expressjwt} = require('express-jwt')
const port = 8081
const morgan = require('morgan')

app.use(express.json())
app.use(morgan('dev'))

mongoose.set("strictQuery", false);

mongoose.connect('mongodb://127.0.0.1:27017/RTVdb')
. catch (error => console.log(error))
. then (() => console.log("connected to db"));

//routes 
app.use("/auth", require("./routes/authRouter"))
app.use('/api', expressjwt({ secret: process.env.SECRET, algorithms: ['HS256'] })) 
app.use("/comments", require("./routes/commentsRouter"))
app.use("/issue", require("./routes/issueRouter"))
app.use("/user", require("./routes/userRouter"))

//main err handling 
app.use((err, req, res, next) => {
    console.log(err)
    if(err.name === "UnauthorizedError"){
        res.status(err.status)
    }
    return res.send({errMsg: err.message})
})

//server turn on 
app.listen(port, () => {
    console.log("the server is on")
})