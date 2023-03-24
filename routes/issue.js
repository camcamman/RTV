const express = require("express")
const issueRouter = express.Router()
const mongoose = require("mongoose")
const issue = require("../models/IssueRouter")
const issueDb = require("../models/IssueRouter")

//get all 
issueRouter.get("/", async (req, res, next)=> {
    const stuff = await issueDb.find()
    .populate({path: 'user', select: ['username', '_id'] })
    .exec()

    return res.status(200).send(stuff)
})

//get one 
issueRouter.get("/:issueId", async (req, res, next) => {
    const id = req.params.issueId
    const foundIssue = await issueDb.findById(id).exec();
    return res.status(200).send(foundIssue)
})

//add one 
issueRouter.post("/:userId", async (req, res, next) => {
    req.body.user = req.params.userId
    const newIssue = new issueDb(req.body)
    const result = await newIssue.save()
    return res.status(200).send(result)
})

//delete one 
issueRouter.delete("/:issueId", async (req, res) => {
    const id = req.params.issueId
    const result = await issueDb.findByIdAndRemove(id)
    return res.status(200).send(result)
})

//edit One 
issueRouter.put("/:issueId", async (req, res) => {
    const id = req.params.issueId
    const newIssue = req.body
    const updatedComment = await issueDb.findByIdAndUpdate(id, newIssue)
    return res.status(200).send(updatedComment)
})


module.exports = issueRouter