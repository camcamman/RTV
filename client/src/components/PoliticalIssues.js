import axios from "axios";
import React, { useEffect, useState } from "react";
import PoliticalIssuesComponent from "./PoliticalIssuesComponent";

const initInputs = {newIssue: ""}

export default function Political (props) {
    const [issueState, setIssueState] = useState([])
    const [issueForm, setIssueForm] = useState(initInputs)
    const { addNewIssue, upVoteIssue, addComment } = props
    const logedInUser = {
        logedInUsername: JSON.parse(localStorage.getItem("user")).username,
        logedInId: JSON.parse(localStorage.getItem("user"))._id
    }

    let newIssueObj = {
        issue: "",
        // user: ""
    }

    let newIssueObjForState = {}

    function getIssue () {
        axios.get("/issue")
        .then(res => {
            // console.log(res.data)
            res.data.map((theData) => {
                // console.log(theData)
                setIssueState(prevState => {
                    return[
                        ...prevState,
                        theData
                    ]
                })
                // console.log(issueState)
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

    //handle sumbit to add new issue to page 
    function handleSumbit (e) {
        e.preventDefault()
        newIssueObj = {
            issue: issueForm.newIssue,
            user: logedInUser.logedInId
        }

        newIssueObjForState = {
            issue: issueForm.newIssue,
            user: {
                username: logedInUser.logedInUsername,
                _id: logedInUser.logedInId
            }
        }

        addNewIssue(newIssueObj, logedInUser.logedInId)

        // console.log(issueState)
        // console.log(issueState.user)
        // console.log(issueState.user.username)
        // console.log(newIssueObj.issue)
        // console.log(logedInUser.logedInId)

        setIssueState(prevState => {
            return[
                ...prevState,
                newIssueObjForState
            ]
        })
        // console.log(issueState)
    }

    useEffect(() => {
        getIssue()
    }, [])

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

                {/* <button onClick={(() => addComment())}>Add comment</button> */}

            <div>
                {/* {console.log(issueState)} */}
            {issueState.map((issue) => {

                // console.log(issue)
                // console.log(issue._id)
                // console.log(issue.votes)
                return(
                    <div>

                    {/* <button onClick={(() => addComment(testComment, logedInUser.logedInId, issue._id))}>Add comment</button> */}

                    <PoliticalIssuesComponent 
                    key = {issue._id}
                    issue = {issue}
                    addComment={addComment}
                    upVoteIssue = {upVoteIssue}
                    userId = {logedInUser.logedInId}
                    />
                </div>
            )
        })}
            </div>
        </div>
    )
}