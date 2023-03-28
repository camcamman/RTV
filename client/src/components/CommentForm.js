import React, { useState } from "react";

export default function CommentComponet (props) {
    // const initInputs = {comment: ""}
    const [input, setInput] = useState("")
    const { addCommentBackEnd, addNewCommentFrontEnd } = props

    // console.log(input)

    //handle submit to add comment to issue 
    function handleSubmit (e) {
        e.preventDefault()
        // console.log(input)
        addNewCommentFrontEnd(input)
        setInput("")
        // console.log("submit handled")
    }


    return (
        <form onSubmit={handleSubmit}>
           <input
                    type="text"
                    placeholder="comment"
                    value={input}
                    // onChange={handleChange}
                    onChange={(e) => setInput(e.target.value)}
                    name="comment"
                    required
                ></input>
                <input
                    type="submit"
                ></input>
        </form>
    )
}