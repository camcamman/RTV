const mongoos = require("mongoose")
const Schema = mongoos.Schema

const commentsSchema = new Schema({
    comment:{
        type: String,
        required: true
    },
    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
    },
    issue: {
        type: Schema.Types.ObjectId,
        ref: "issue"
    }
})

module.exports = mongoos.model("comments", commentsSchema)