import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import CommentForm from "./CommentForm";
import { MainContext } from "./context/mainFunctionContext";

export default function PoliticalIssuesComponent (props) {
    const {issue, user, _id, description, voteNum, votedUsers} = props.issue
    // const { handleNewVote, votedUsersStateIds } = props
    // const userId = user._id
    const userId = JSON.parse(localStorage.getItem("user"))._id
    const { upVoteIssue, addComment, downVoteIssue, saveVotedUser } = useContext(MainContext)
    const [voteNumber, setVoteNumber] = useState(voteNum)
    const [comments, setComments] = useState([])
    // const [votedUserState, setVotedUserState] = useState([])
    const [voted, setVoted] = useState(false)


    function hasUserVotedFunction () {
        // const hasUserVoted = votedUsers.find((theId) => theId === userId)
        // const hasUserVoted = votedUsers.find((theId) => {
        //     console.log("theId")
        //     console.log(theId)
        //     console.log("userId")
        //     console.log(userId)
        //     return theId === 3
        // })

        votedUsers.map(theUserId => {
            console.log("theId")
            console.log(theUserId)
            console.log("userId")
            console.log(userId)
            if (userId === theUserId) {
                console.log("match")
            }
        })

        // if (hasUserVoted) {
        //     setVoted(true)
        // }
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



    //add comment to front end 
    function addNewComment (newComment) {
        setComments(prevComments => {
            return[
                ...prevComments,
                newComment
            ]
        })
    }



    //call function to get all comments and save them to state 
    useEffect(() => {
        getComments()
        hasUserVotedFunction()
    },[])



    //up vote issue 
    function upVoteButton () {
        // setVotedUserState(prevArr => {
        //     return [
        //         ...prevArr,
        //         userId
        //     ]
        // })

        // handleNewVote(userId)
        let newVotedUserObj = {votedUsers: [...votedUsers, userId]}
        setVoted(true)
        upVoteIssue(_id)
        saveVotedUser(_id, newVotedUserObj)
        setVoteNumber(prevVoteNum => prevVoteNum + 1)
    }

    //down vote issue
    function downVoteButton () {
        // setVotedUserState(prevArr => {
        //     return [
        //         ...prevArr,
        //         userId
        //     ]
        // })

        // handleNewVote(userId)
        // console.log(votedUserState)
        // let newVotedUserObj = {votedUsers: votedUserState}
        // let newVotedUserObj = {votedUsers: votedUsersStateIds}
        let newVotedUserObj = {votedUsers: [...votedUsers, userId]}
        console.log(newVotedUserObj)
        // console.log(...votedUsers)
        console.log(votedUsers)
        console.log(userId)
        setVoted(true)
        downVoteIssue(_id)
        saveVotedUser(_id, newVotedUserObj)
        setVoteNumber(prevVoteNum => prevVoteNum - 1)
    }



    return(
        <div>
            <p>{issue}</p>
            <p>{description}</p>
            <p>Posted by {user.username}</p>
            <p>This issue has {voteNumber} votes</p>
            {/* {if ("userId exists") {
                dont show buttons 
            } else {
                show buttons 
            }} */}
            {voted 
                ? 
                <p>you can only vote once</p> 
                : 
                <div>
                    <button onClick={upVoteButton}>Up vote issue</button>
                    <button onClick={downVoteButton}>Down vote issue</button>
                </div>
            }

            {/* <button onClick={upVoteButton}>Up vote issue</button>
            <button onClick={downVoteButton}>Down vote issue</button> */}
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