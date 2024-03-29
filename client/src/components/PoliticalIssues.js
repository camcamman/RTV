import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "./context/mainFunctionContext";
import PoliticalIssuesComponent from "./PoliticalIssuesComponent";
import '../styles/politicalissue.css'

const initInputs = {newIssue: "", newDescription: "", votes:{users: []}}

export default function Political (props) {
    const [issueState, setIssueState] = useState([])
    const [issueForm, setIssueForm] = useState(initInputs)

    const { addNewIssue } = useContext(MainContext)

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
                // console.log(votedUsersState)
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
            description: issueForm.newDescription,
            votes: {users: []}
            
            // user: logedInUser.logedInId
        }

        //the object for state 
        newIssueObjForState = {
            issue: issueForm.newIssue,
            description: issueForm.newDescription,
            user: {
                username: logedInUser.logedInUsername,
                _id: logedInUser.logedInId
            },
            votedUsers: []
        }

        //adding new issue for the back end 
        addNewIssue(newIssueObj, logedInUser.logedInId)

        //adding the new issue to the front end for state
        setIssueState(prevState => {
            return[
                ...prevState,
                newIssueObjForState
            ]
        })
        // console.log(issueState)
    }

    //use effect to get all issues 
    useEffect(() => {
        getIssue()
    }, [])
    
    function filterVotes () {
        issueState.sort((a, b) => b.votes-a.votes)
    }

    filterVotes()

    return (
        <div className="political-container">
          <div className="political-form">
            <form onSubmit={handleSumbit}>
              <input
                type="text"
                placeholder="New issue"
                name="newIssue"
                value={issueForm.newIssue}
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="New description"
                name="newDescription"
                value={issueForm.newDescription}
                onChange={handleChange}
              />
              <input type="submit" value="Submit"/>
            </form>
          </div>
          <div className="political-issues">
            {issueState.map((issue) => {
              return(
                <div className="political-issue">
                  <PoliticalIssuesComponent 
                    key={issue._id}
                    issue={issue}
                  />
                </div>
              )
            })}
          </div>
        </div>
      )      
}