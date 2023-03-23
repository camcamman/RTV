const express = require('express')
const authRouter = express.Router()
const User = require('../models/user.js')
const jwt = require('jsonwebtoken')

//signup
authRouter.post("/signup", async (req, res, next) => {
    const foundLogin = await User.findOne({ username: req.body.username.toLowerCase() }).exec()

    if(foundLogin !== null){
        res.status(403)
        return next(new Error("That username is already taken"))
    }

    const newUser = new User(req.body)

    const saveNewUser = await newUser.save()

    const token = jwt.sign(saveNewUser.withoutPassword(), process.env.SECRET)

    return res.status(201).send({ token, user: saveNewUser.withoutPassword()})
})


//login 
authRouter.post("/login", async (req, res, next) => {
    const foundLogin = await User.findOne({ username: req.body.username.toLowerCase() }).exec()
    const foundPassword = await User.findOne({ password: req.body.password }).exec()

    console.log(foundLogin)
    if (foundLogin ===  null) {
        return next (new Error ("Username or Password are incorrect"))
    }
    foundLogin.checkPassword(foundPassword, (err, isMatch) => {
        if (err) {
            res.status(403)
            return next(new Error("Username or Password are incorrect"))
        }
        if (isMatch) {
            res.status(403)
            return next(new Error("Username or Password are incorrect"))
        }
        const token = jwt.sign(foundLogin.withoutPassword(), process.env.SECRET)
        return res.status(200).send({token, user: foundLogin.withoutPassword()})
    })
})

module.exports = authRouter