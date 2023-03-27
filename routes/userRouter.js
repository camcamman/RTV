const express = require("express")
const userRouter = express.Router()
const mongoose = require("mongoose")
const user = require("../models/UserRouter")
const UserDb = require("../models/UserRouter")

//get all 
userRouter.get("/", async (req, res, next)=> {
    const userThing = await UserDb.find().exec()
    return res.status(200).send(userThing)
})

//get one 
userRouter.get("/:userId", async (req, res, next) => {
    const id = req.params.userId
    const foundUser = await UserDb.findById(id).exec();
    return res.status(200).send(foundUser)
})

//add one 
userRouter.post("/", async (req, res, next) => {
    const newUser = new UserDb(req.body)
    const result = await newUser.save()
    return res.status(200).send(result)
})

//delete one 
userRouter.delete("/:userId", async (req, res) => {
    const id = req.params.userId
    const result = await UserDb.findByIdAndRemove(id)
    return res.status(200).send(result)
})

//edit One 
userRouter.put("/:userId", async (req, res) => {
    const id = req.params.userId
    const newUser = req.body
    const updatedUser = await UserDb.findByIdAndUpdate(id, newUser)
    return res.status(200).send(updatedUser)
})


module.exports = userRouter