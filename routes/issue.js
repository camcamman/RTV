const express = require("express")
const issueRouter = express.Router()
const mongoose = require("mongoose")
const issue = require("../models/IssueRouter")
const issueDb = require("../models/IssueRouter")

//get all 
issueRouter.get("/", async (req, res, next)=> {
    const stuff = await issueDb.find({}).exec()
    return res.status(200).send(stuff)
})

//get one 
issueRouter.get("/:issueId", async (req, res, next) => {
    const foundComment = await issueDb.findOne({}).exec()
    return res.status(200).send(foundComment)
})

//add one 
issueRouter.post("/", async (req, res, next) => {
    const addedComment = await issueDb.save({}).exec()
    return res.status(200).send(addedComment)
})

//delete one 
issueRouter.delete("/:issueId", async (req, res) => {
    const deletedComment = await issueDb.findOneAndDelete({}).exec()
    return res.status(200).send(deletedComment)
})

//edit One 
issueRouter.put("/:issueId", async (req, res) => {
    const updatedComment = await issueDb.findOneAndUpdate({}).exec()
    return res.status(200).send(updatedComment)
})


module.exports = issueRouter