const express = require(`express`)
const commentsRouter = express.Router()
const mongoose = require("mongoose")
const commentsDb = require("../models/CommentsRouter")

//get all 
commentsRouter.get("/", async (req, res, next)=> {
    const stuff = await commentsDb.find({}).exec()
    return res.status(200).send(stuff);
})

//get one 
commentsRouter.get("/:commentsId", async (req, res, next) => {
    const foundComment = await commentsDb.findOne({}).exec()
    return res.status(200).send(foundComment)
})

//add one 
commentsRouter.post("/", async (req, res, next) => {
    const addedComment = await commentsDb.save({}).exec()
    return res.status(200).send(addedComment)
})

//delete one 
commentsRouter.delete("/:commentsId", async (req, res) => {
    const deletedComment = await commentsDb.findOneAndDelete({}).exec()
    return res.status(200).send(deletedComment)
})

//edit One 
commentsRouter.put("/:commentsId", async (req, res) => {
    const updatedComment = await commentsDb.findOneAndUpdate({}).exec()
    return res.status(200).send(updatedComment) 
})


module.exports = commentsRouter