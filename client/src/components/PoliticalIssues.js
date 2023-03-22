import axios from "axios";
import React, { useEffect, useState } from "react";
import PoliticalIssuesComponent from "./PoliticalIssuesComponent";

const initInputs = {newIssue: ""}

export default function Political (props) {
    const [issueState, setIssueState] = useState([])
    const [issueForm, setIssueForm] = useState(initInputs)
    const { addNewIssue } = props

    let newIssueObj = {
        issue: "",
        user: ""
    }

    function getIssue () {
        axios.get("/issue")
        .then(res => {
            res.data.map((theData) => {
                setIssueState(prevState => {
                    return[
                        ...prevState,
                        theData
                    ]
                })
            })
        })
        .catch(err => console.error(err))
    }

    function handleChange (e) {
        const {name, value} = e.target
        setIssueForm(prevBounty => {
            return{
                ...prevBounty,
                [name]: value
            }
        })
        // console.log(issueForm)
    }

    function handleSumbit (e) {
        e.preventDefault()
        newIssueObj = {
            issue: issueForm.newIssue,
            user: JSON.parse(localStorage.getItem("user")).username
        }

        addNewIssue(newIssueObj)

        setIssueState(prevState => {
            return[
                ...prevState,
                newIssueObj
            ]
        })
        // console.log(issueState)
    }

    useEffect(() => {
        getIssue()
    }, [])

    // console.log(addNewIssue)

    return (
        <div>
            <div>
                <form onSubmit={handleSumbit}>
                    <input
                        type="text"
                        placeholder="New issue"
                        name="newIssue"
                        value={issueForm.newIssue}
                        onChange={handleChange}
                    />
                    <input type="submit"/>
                </form>
            </div>
            <div>
                {/* {console.log(issueState[0])} */}
            {/* {issueState[0].map((issue) => { */}
            {issueState.map((issue) => {
                // console.log(issue)
            return(
                <div>
                    <PoliticalIssuesComponent 
                    key = {issue._id}
                    issue = {issue}
                    />
                </div>
            )
        })}
            </div>
        </div>
    )
}