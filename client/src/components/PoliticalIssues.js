import axios from "axios";
import React, { useEffect, useState } from "react";
import PoliticalIssuesComponent from "./PoliticalIssuesComponent";

export default function Political () {
    const [issueState, setIssueState] = useState([])

    function getIssue () {
        axios.get("/issue")
        .then(res => {
            // console.log(res.data)
            setIssueState(prevState => {
                return[
                    ...prevState, 
                    res.data
                ]
            })
            // console.log(issueState)
        })
        .catch(err => console.error(err))
    }

    useEffect(() => {
        getIssue()
    }, [])

    function mappedIssue () {
        return(
            <PoliticalIssuesComponent />
        )
    }

    return (
        <div>
            <div>
                {mappedIssue}
            </div>
            <h1>Hello World</h1>
        </div>
    )
}