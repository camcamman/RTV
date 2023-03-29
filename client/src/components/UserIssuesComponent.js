import axios from "axios";
import React, { useEffect, useState } from "react";

export default function UserIssuesComponent (props) {
    const {issue, user, _id, votes, description} = props.issue

    const [voteNumber, setVoteNumber] = useState(votes)
    const [comments, setComments] = useState([])

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

    return(
        <div>
            <p>{issue}</p>
            <p>{description}</p>
            <p>Posted by {user.username}</p>
            <p>This issue has {voteNumber} votes</p>

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