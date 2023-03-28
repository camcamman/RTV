import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import CommentForm from "./CommentForm";
import { MainContext } from "./context/mainFunctionContext";

export default function PoliticalIssuesComponent (props) {
    const {issue, user, _id, votes, description} = props.issue
    // const { upVoteIssue, downVoteIssue, addComment, userId } = props
    const { userId } = props
    const { upVoteIssue, addComment, downVoteIssue } = useContext(MainContext)

    const [voteNumber, setVoteNumber] = useState(votes)
    const [comments, setComments] = useState([])

    function upVoteButton () {
        upVoteIssue(_id)
        setVoteNumber(prevVoteNum => prevVoteNum + 1)
    }

    function downVoteButton () {
        downVoteIssue(_id)
        setVoteNumber(prevVoteNum => prevVoteNum - 1)
    }

    function addNewComment (newComment) {
        setComments(prevComments => {
            return[
                ...prevComments,
                newComment
            ]
        })
    }

    function getComments () {
        axios.get("/comments")
        .then(res => {
            // console.log(res.data)
            res.data.map(theComment => {
                // console.log("working?")
                if (theComment.issue === _id) {
                    // console.log("we have a match")
                    setComments(prevComments => {
                        return[
                            ...prevComments,
                            theComment.comment
                        ]
                    })
                }
            })
        })
        .catch(err => console.error(err))
    }

    useEffect(() => {
        getComments()
    },[])

    // console.log(upVoteIssue)
    // console.log(_id)
    // console.log(issue)
    // console.log(user) 
    return(
        <div>
            <p>{issue}</p>
            <p>{description}</p>
            <p>Posted by {user.username}</p>
            <p>This issue has {voteNumber} votes</p>
            <button onClick={upVoteButton}>Up vote issue</button>
            <button onClick={downVoteButton}>Down vote issue</button>
            {/* <h1>Hello World</h1> */}
            <CommentForm 
                addCommentBackEnd = {addComment}
                addNewCommentFrontEnd = {addNewComment}
                userId = {userId}
                issueId = {_id}
                key = {_id}
            />

            {comments.map((theComment) => {
                // console.log(theComment)
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