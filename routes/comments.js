const express = require(`express`)
const commentsRouter = express.Router()
const mongoose = require("mongoose")
const commentsDb = require("../models/CommentsRouter")

//set up mongoose 
// mongoose.set("strictQuery", false);
// mongoose.connect('mongodb://127.0.0.1:27017/RTV',
// {useNewUrlParser: true},
// (msg) => console.log(msg ? msg : "connected to DB"));

// mongoose.connect('mongodb://127.0.0.1:27017/RTV'). catch (error => console.log(error));

//get all 
commentsRouter.get("/", async (req, res, next)=> {
    const stuff = await commentsDb.find({}).exec()
    return res.status(202).send(stuff);
    // await commentsDb.find((err, stuff) => {
    //     if (err) {
    //         res.status(500).send(err)
    //         return next (err)
    //     }
    //     return res.status(200).send(stuff)
    // })
})

//get one 
commentsRouter.get("/:commentsId", async (req, res, next) => {
    const id = req.params.commentsId
    const foundComment = await commentsDb.findOne({}).exec()
    return foundComment
    // commentsDb.findOne({id: id}, (err, foundComment) => {
    //     if (err) {
    //         res.status(500).send(err)
    //         return next (err)
    //     }
    //     return res.status(200).send(foundComment)
    // })
})

//add one 
commentsRouter.post("/", async (req, res, next) => {
    const newComment = new commentsDb(req.body)
    const addedComment = await commentsDb.save({}).exec()
    return addedComment
    // commentsDb.save((err, addedComment) => {
    //     if (err) {
    //         res.status(500).send(err)
    //         return next (err)
    //     }
    //     return res.status(201).send(addedComment )
    // })
})

//delete one 
commentsRouter.delete("/:commentsId", async (req, res) => {
    const id = req.params.commentsId
    const deletedComment = await commentsDb.findOneAndDelete({}).exec()
    return deletedComment 
    // commentsDb.findOneAndDelete({id: id}, (err, deletedComment) => {
    //     if (err) {
    //         res.status(500).send(err)
    //         return next (err)
    //     }  
    //     return res.status(200).send("deleted Comment")
    // })
})

//edit One 
commentsRouter.put("/:commentsId", async (req, res) => {
    const id = req.params.commentsId
    const newComment = req.body
    const updatedComment = await commentsDb.findOneAndUpdate({})
    return updatedComment
    // commentsDb.findOneAndUpdate({id: id}, newComment, (err, updatedComment) => {
    //     if (err) {
    //         res.status(500).send(err)
    //         return next (err)
    //     }
    //     return res.status(201).send(updatedComment)
    // })
})


module.exports = commentsRouter