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
    // votes: {
    //     type: Number,
    //     default: 0
    // }
})

module.exports = mongoos.model("comments", commentsSchema)