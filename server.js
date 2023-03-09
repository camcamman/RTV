const express = require("express")
const app = express()
const port = 8081

app.use(express.json())

//routes 
app.use("/comments", require("./routes/commentsRouter"))
app.use("/issue", require("./routes/issueRouter"))
app.use("/user", require("./routes/userRouter"))

//main err handling 
app.use((err, req, res, next) => {
    console.log(err)
    return res.send({errMsg: err.message})
})

//server turn on 
app.listen(port, () => {
    console.log("the server is on")
})