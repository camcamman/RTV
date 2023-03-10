const mongoos = require("mongoose")
const Schema = mongoos.Schema

const issueSchema = new Schema({
    temp:{
        type: String,
        required: true
    }
})

module.exports = mongoos.model("issue", issueSchema)