import React, { useState } from "react";
import '../styles/commentForm.css'

export default function CommentComponet (props) {
    // const initInputs = {comment: ""}
    const [input, setInput] = useState("")
    const { 
        addCommentBackEnd, 
        addNewCommentFrontEnd,
        userId,
        issueId
    } = props

    // console.log(input)

    //handle submit to add comment to issue 
    function handleSubmit (e) {
        e.preventDefault()
        const backEndObject = {
            comment: input
        }
        addCommentBackEnd(backEndObject, userId, issueId)
        // console.log(input)
        addNewCommentFrontEnd(input)
        setInput("")
        // console.log("submit handled")
    }


    return (
        <form onSubmit={handleSubmit} className="comment-form">
          <input
            type="text"
            placeholder="Add a comment"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            name="comment"
            required
          />
          <input type="submit" value="Submit" />
        </form>
      );      
}