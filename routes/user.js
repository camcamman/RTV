const express = require("express")
const userRouter = express.Router()
const mongoose = require("mongoose")
const user = require("../models/UserRouter")
const UserDb = require("../models/UserRouter")

//get all 
userRouter.get("/", async (req, res, next)=> {
    const userThing = await UserDb.find({}).exec()
    return userThing
})

//get one 
userRouter.get("/:userId", async (req, res, next) => {
    const userThing = await UserDb.findOnefind({}).exec()
    return userThing
})

//add one 
userRouter.post("/", async (req, res, next) => {
    const userThing = await UserDb.savefind({}).exec()
    return userThing
})

//delete one 
userRouter.delete("/:userId", async (req, res) => {
    const userThing = await UserDb.findOneAndDeletefind({}).exec()
    return userThing
})

//edit One 
userRouter.put("/:userId", async (req, res) => {
    const userThing = await UserDb.findOneAndUpdatefind({}).exec()
    return userThing
})


module.exports = userRouter