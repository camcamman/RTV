const mongoos = require("mongoose")
const Schema = mongoos.Schema

const commentsSchema = new Schema({
    temp:{
        type: String,
        required: true
    }
})

module.exports = mongoos.model("comments", commentsSchema)