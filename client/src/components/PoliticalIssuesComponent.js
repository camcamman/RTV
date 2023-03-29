import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import CommentForm from "./CommentForm";
import { MainContext } from "./context/mainFunctionContext";

export default function PoliticalIssuesComponent (props) {
    const {issue, user, _id, description, voteNum} = props.issue
    // const { upVoteIssue, downVoteIssue, addComment, userId } = props
    const userId = user._id
    const { upVoteIssue, addComment, downVoteIssue, saveVotedUser } = useContext(MainContext)

    const [voteNumber, setVoteNumber] = useState(voteNum)
    const [comments, setComments] = useState([])
    const [votedUserState, setVotedUserState] = useState([])

    // console.log(props.issue)


    //up vote issue 
    function upVoteButton () {
        setVotedUserState(prevArr => {
            return [
                ...prevArr,
                userId
            ]
        })

        let newVotedUserObj = {votedUsers: votedUserState}

        // console.log(votedUserState)
        // console.log(newVotedUserObj)

        upVoteIssue(_id)
        saveVotedUser(_id, newVotedUserObj)
        setVoteNumber(prevVoteNum => prevVoteNum + 1)
    }

    //down vote issue
    function downVoteButton () {

        setVotedUserState(prevArr => {
            return [
                ...prevArr,
                userId
            ]
        })

        let newVotedUserObj = {votedUsers: votedUserState}

        downVoteIssue(_id)
        saveVotedUser(_id, newVotedUserObj)
        setVoteNumber(prevVoteNum => prevVoteNum - 1)
    }

    //add comment to front end 
    function addNewComment (newComment) {
        setComments(prevComments => {
            return[
                ...prevComments,
                newComment
            ]
        })
    }

    //get all comments and save them to state 
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

    //call function to get all comments and save them to state 
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