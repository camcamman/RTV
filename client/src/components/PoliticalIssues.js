import axios from "axios";
import React, { useEffect, useState } from "react";
import PoliticalIssuesComponent from "./PoliticalIssuesComponent";

export default function Political () {
    const [issueState, setIssueState] = useState([])

    function getIssue () {
        axios.get("/issue")
        .then(res => {
            setIssueState(prevState => {
                return[
                    ...prevState, 
                    res.data
                ]
            })
        })
        .catch(err => console.error(err))
    }

    useEffect(() => {
        getIssue()
    }, [])

    return (
        <div>
            <div>
            {issueState.map((issue) => {
            return(
                <div>
                    <PoliticalIssuesComponent 
                    key = {issue[0]._id}
                    issue = {issue[0]}
                    />
                </div>
            )
        })}
            </div>
        </div>
    )
}