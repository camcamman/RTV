import React from "react";

export default function PoliticalIssuesComponent (props) {

    const {issue, user} = props.issue
    // console.log(issue)
    // console.log(user) 
    return(
        <div>
            <p>{issue}</p>
            <p>Posted by {user.username}</p>
            {/* <h1>Hello World</h1> */}
            <br/>
            <br/>
        </div>
    )
}