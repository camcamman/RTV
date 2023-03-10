const express = require("express")
const issueRouter = express.Router()
const mongoose = require("mongoose")
const issue = require("../models/IssueRouter")
const issueDb = require("../models/IssueRouter")

//get all 
issueRouter.get("/", async (req, res, next)=> {
    const stuff = await issueDb.find({}).exec()
    return stuff
})

//get one 
issueRouter.get("/:issueId", async (req, res, next) => {
    const foundComment = await issueDb.findOne({}).exec()
    return foundComment
})

//add one 
issueRouter.post("/", async (req, res, next) => {
    const addedComment = await issueDb.save({}).exec()
    return addedComment
})

//delete one 
issueRouter.delete("/:issueId", async (req, res) => {
    const deletedComment = await issueDb.findOneAndDelete({}).exec()
    return deletedComment
})

//edit One 
issueRouter.put("/:issueId", async (req, res) => {
    const updatedComment = await issueDb.findOneAndUpdate({}).exec()
    return updatedComment
})


module.exports = issueRouter