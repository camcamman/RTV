const mongoos = require("mongoose")
const Schema = mongoos.Schema

const issueSchema = new Schema({
    issue:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
    },
    votedUsers:{
        type: Array,
        required: true
    },
    voteNum: {
        type: Number,
        default: 0
    }
})

module.exports = mongoos.model("issue", issueSchema)