const mongoos = require("mongoose")
const Schema = mongoos.Schema

const userSchema = new Schema({
    temp:{
        type: String,
        required: true
    }
})

module.exports = mongoos.model("user", userSchema)