const mongoos = require("mongoose")
const Schema = mongoos.Schema

const issueSchema = new Schema({
    issue:{
        type: String,
        required: true
    },
    user:{
        type: String,
        required: true 
    }
})

module.exports = mongoos.model("issue", issueSchema)