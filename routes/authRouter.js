const express = require('express')
const authRouter = express.Router()
const User = require('../models/user.js')
const jwt = require('jsonwebtoken')

//signup
authRouter.post("/signup", async (req, res, next) => {
    const foundUsername = await User.findOne({ username: req.body.username.toLowerCase() }).exec()

    if(foundUsername !== null){
        res.status(403)
        return next(new Error("That username is already taken"))
    }

    const newUser = new User(req.body)

    const saveNewUser = await newUser.save()

    const token = jwt.sign(saveNewUser.toObject(), process.env.SECRET)

    return res.status(201).send({ token, user: saveNewUser})
})


module.exports = authRouter