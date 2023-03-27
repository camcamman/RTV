const express = require(`express`)
const commentsRouter = express.Router()
const mongoose = require("mongoose")
const CommentDb = require("../models/Comments")

//get all 
commentsRouter.get("/", async (req, res, next)=> {
    const stuff = await CommentDb.find().exec()
    return res.status(200).send(stuff);
})

//get one 
commentsRouter.get("/:commentsId", async (req, res, next) => {
    const id = req.params.commentsId
    const foundComment = await CommentDb.findById(id).exec();
    return res.status(200).send(foundComment)
})

//add one 
commentsRouter.post("/", async (req, res, next) => {
    const newComment = new CommentDb(req.body)
    const result = await newComment.save()
    return res.status(200).send(result)
})

//delete one 
commentsRouter.delete("/:commentsId", async (req, res) => {
    const id = req.params.commentsId
    const result = await CommentDb.findByIdAndRemove(id)
    return res.status(200).send(result)
})

//edit One 
commentsRouter.put("/:commentsId", async (req, res) => {
    const id = req.params.commentsId
    const newComment = req.body
    const updatedComment = await CommentDb.findByIdAndUpdate(id, newComment)
    return res.status(200).send(updatedComment)
})


module.exports = commentsRouter