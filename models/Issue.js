const mongoos = require("mongoose")
const Schema = mongoos.Schema

const issueSchema = new Schema({
    issue:{
        type: String,
        required: true
    },
    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
    },
    votes: {
        type: Number,
        default: 0
    }
})

module.exports = mongoos.model("issue", issueSchema)