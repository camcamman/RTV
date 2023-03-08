const express = require("express")
const userRouter = express.Router()
const mongoose = require("mongoose")
const user = require("../models/User")
const UserDb = require("../routes/userRouter")

//set up mongoose 
mongoose.set("strictQuery", false);
mongoose.connect('mongodb://127.0.0.1:27017/bountyDB',
{useNewUrlParser: true},
(msg) => console.log(msg ? msg : "connected to DB"));

//get all 
userRouter.get("/", (req, res, next)=> {
    UserDb.find((err, stuff) => {
        if (err) {
            res.status(500).send(err)
            return next.err
        }
        return res.status(200).send(stuff)
    })
})

//get one 
userRouter.get("/:userId", (req, res, next) => {
    const id = req.params.userId
    UserDb.findOne({id: id}, (err, foundmovie) => {
        if (err) {
            res.status(500).send(err)
            return next (err)
        }
        return res.status(200).send(foundmovie)
    })
})

//add one 
userRouter.post("/", (req, res, next) => {
    const newUser = new UserDb(req.body)
    UserDb.save((err, addedMovie) => {
        if (err) {
            res.status(500).send(err)
            return next (err)
        }
        return res.status(201).send(addedMovie )
    })
})

//delete one 
userRouter.delete("/:userId", (req, res) => {
    const id = req.params.userId
    UserDb.findOneAndDelete({id: id}, (err, deletedUser) => {
        if (err) {
            res.status(500).send(err)
            return next (err)
        }  
        return res.status(200).send("deleted User")
    })
})

//edit One 
userRouter.put("/:userId", (req, res) => {
    const id = req.params.userId
    const newUser = req.body
    UserDb.findOneAndUpdate({id: id}, newUser, (err, updatedUser) => {
        if (err) {
            res.status(500).send(err)
            return next (err)
        }
        return res.status(201).send(updatedUser)
    })
})


module.exports = userRouter