import React, { useState } from "react";

export default function PoliticalIssuesComponent (props) {
    const {issue, user, _id, votes} = props.issue
    const {upVoteIssue } = props
    const [voteNumber, setVoteNumber] = useState(votes)

    function voteButton () {
        upVoteIssue(_id)
        setVoteNumber(prevVoteNum => prevVoteNum + 1)
    }

    // console.log(upVoteIssue)
    // console.log(_id)
    // console.log(issue)
    // console.log(user) 
    return(
        <div>
            <p>{issue}</p>
            <p>Posted by {user.username}</p>
            {/* <p>This issue has {votes} votes</p> */}
            <p>This issue has {voteNumber} votes</p>
            <button onClick={voteButton}>Up vote issue</button>
            {/* <h1>Hello World</h1> */}
            <br/>
            <br/>
        </div>
    )
}