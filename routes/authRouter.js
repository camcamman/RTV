const express = require('express')
const authRouter = express.Router()
const User = require('../models/user.js')
const jwt = require('jsonwebtoken')

authRouter.post("./signup", (req, res, next) => {})


module.exports = authRouter