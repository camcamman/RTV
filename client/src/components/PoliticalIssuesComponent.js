import React, { useState } from "react";
import CommentForm from "./CommentForm";

export default function PoliticalIssuesComponent (props) {
    const {issue, user, _id, votes} = props.issue
    const { upVoteIssue, addComment } = props
    const [voteNumber, setVoteNumber] = useState(votes)
    const [comments, setComments] = useState([])

    function voteButton () {
        upVoteIssue(_id)
        setVoteNumber(prevVoteNum => prevVoteNum + 1)
    }

    function addNewComment (newComment) {
        setComments(prevComments => {
            return[
                ...prevComments,
                newComment
            ]
        })
    }

    // console.log(upVoteIssue)
    // console.log(_id)
    // console.log(issue)
    // console.log(user) 
    return(
        <div>
            <p>{issue}</p>
            <p>Posted by {user.username}</p>
            <p>This issue has {voteNumber} votes</p>
            <button onClick={voteButton}>Up vote issue</button>
            {/* <h1>Hello World</h1> */}
            <CommentForm 
                addCommentBackEnd = {addComment}
                addNewCommentFrontEnd = {addNewComment}
            />

            {comments.map((theComment) => {
                console.log(theComment)
                return(
                    <div>
                        {theComment}
                    </div>
                )
            })}

            <br/>
            <br/>
        </div>
    )
}