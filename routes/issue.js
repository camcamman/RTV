const express = require("express")
const issueRouter = express.Router()
const mongoose = require("mongoose")
const movies = require("../models/Issue")
const issueDb = require("../routes/issueRouter")

//set up mongoose 
mongoose.set("strictQuery", false);
mongoose.connect('mongodb://127.0.0.1:27017/commentsDB',
{useNewUrlParser: true},
(msg) => console.log(msg ? msg : "connected to DB"));

//get all 
issueRouter.get("/", (req, res, next)=> {
    issueDb.find((err, stuff) => {
        if (err) {
            res.status(500).send(err)
            return next.err
        }
        return res.status(200).send(stuff)
    })
})

//get one 
issueRouter.get("/:issueId", (req, res, next) => {
    const id = req.params.issueId
    issueDb.findOne({id: id}, (err, foundmovie) => {
        if (err) {
            res.status(500).send(err)
            return next (err)
        }
        return res.status(200).send(foundmovie)
    })
})

//add one 
issueRouter.post("/", (req, res, next) => {
    const newIssue = new issueDb(req.body)
    issueDb.save((err, addedMovie) => {
        if (err) {
            res.status(500).send(err)
            return next (err)
        }
        return res.status(201).send(addedMovie )
    })
})

//delete one 
issueRouter.delete("/:issueId", (req, res) => {
    const id = req.params.issueId
    issueDb.findOneAndDelete({id: id}, (err, deletedMovie) => {
        if (err) {
            res.status(500).send(err)
            return next (err)
        }  
        return res.status(200).send("deleted Movie")
    })
})

//edit One 
issueRouter.put("/:issueId", (req, res) => {
    const id = req.params.issueId
    const newIssue = req.body
    issueDb.findOneAndUpdate({id: id}, newIssue, (err, updatedMovie) => {
        if (err) {
            res.status(500).send(err)
            return next (err)
        }
        return res.status(201).send(updatedMovie)
    })
})


module.exports = issueRouter