import React from "react";

export default function PoliticalIssuesComponent (props) {

    const {issue, user} = props.issue
    // console.log(issue)
    // console.log(user)
    return(
        <div>
            <p>{issue}</p>
            <p>Posted by {user}</p>
            <br/>
            <br/>
        </div>
    )
}