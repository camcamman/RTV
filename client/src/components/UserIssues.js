import axios from "axios";
import React, { useEffect, useState } from "react";
import UserIssuesComponent from "./UserIssuesComponent";

export default function UserIssues () {
    const logedInId = JSON.parse(localStorage.getItem("user"))._id
    const [userIssueState, setUserIssueState] = useState([])

    function getIssue () {
        axios.get("/issue")
        .then(res => {
            // console.log(res.data)
            res.data.map(issue => {
                if (issue.user._id === logedInId) {
                    console.log("found one")
                    console.log(issue)
                    setUserIssueState(prevState => {
                        return[
                            ...prevState,
                            issue
                        ]
                    })
                }
            })
        })
        .catch(err => console.error(err))
    }

    useEffect(() => {
        getIssue()
    }, [])

    return(
        <div>
            <div>
                {userIssueState.map(issue => {
                    return(
                        <UserIssuesComponent 
                            key = {issue._id}
                            issue = {issue}
                            // userId = {logedInId}
                        />
                    )
                })}
            </div>
            {/* <h1>Hello World</h1> */}
        </div>
    )
}