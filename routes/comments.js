const express = require("express")
const commentsRouter = express.Router()
const mongoose = require("mongoose")
const comments = require("../models/Comments")
const commentsDb = require("../routes/commentsRouter")

//set up mongoose 
mongoose.set("strictQuery", false);
mongoose.connect('mongodb://127.0.0.1:27017/RTV',
{useNewUrlParser: true},
(msg) => console.log(msg ? msg : "connected to DB"));

//get all 
commentsRouter.get("/", (req, res, next)=> {
    commentsDb.find((err, stuff) => {
        if (err) {
            res.status(500).send(err)
            return next.err
        }
        return res.status(200).send(stuff)
    })
})

//get one 
commentsRouter.get("/:commentsId", (req, res, next) => {
    const id = req.params.commentsId
    commentsDb.findOne({id: id}, (err, foundmovie) => {
        if (err) {
            res.status(500).send(err)
            return next (err)
        }
        return res.status(200).send(foundmovie)
    })
})

//add one 
commentsRouter.post("/", (req, res, next) => {
    const newComment = new commentsDb(req.body)
    commentsDb.save((err, addedMovie) => {
        if (err) {
            res.status(500).send(err)
            return next (err)
        }
        return res.status(201).send(addedMovie )
    })
})

//delete one 
commentsRouter.delete("/:commentsId", (req, res) => {
    const id = req.params.commentsId
    commentsDb.findOneAndDelete({id: id}, (err, deletedMovie) => {
        if (err) {
            res.status(500).send(err)
            return next (err)
        }  
        return res.status(200).send("deleted Movie")
    })
})

//edit One 
commentsRouter.put("/:commentsId", (req, res) => {
    const id = req.params.commentsId
    const newComment = req.body
    commentsDb.findOneAndUpdate({id: id}, newComment, (err, updatedMovie) => {
        if (err) {
            res.status(500).send(err)
            return next (err)
        }
        return res.status(201).send(updatedMovie)
    })
})


module.exports = commentsRouter