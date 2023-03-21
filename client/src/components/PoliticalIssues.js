import axios from "axios";
import React, { useEffect, useState } from "react";
import PoliticalIssuesComponent from "./PoliticalIssuesComponent";

export default function Political () {
    const [issueState, setIssueState] = useState([])
    const nums = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]

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

    function MappedIssue () {
        // const Test = nums.map((daNum) => {
        //     console.log(daNum)
        //     return(
        //         <div>Hello World</div>
        //     )
        // })
        // const MappingIssue = (() => {
        //     // return(
        //     //     <PoliticalIssuesComponent />
        //     // )
        // })
        // console.log(issueState)
        
        return(
            <>
                <MappingIssue />
                {/* <PoliticalIssuesComponent /> */}
                {/* {Test}  */}
            </>
        )
    }

    const MappingIssue = (() => {issueState.map((issue) => {
    // const MappingIssue = (() => {nums.map((issue) => {
        // console.log(issue)
        // console.log(issue[0])
        // console.log(issue[0]._id)
        // return(
        //     // <div>
        //     //     <h1>Hello world</h1>
        //     // </div>
        //     <PoliticalIssuesComponent />
        // )
        // return(<PoliticalIssuesComponent />)
        return(
            issue[0]._id
        )
    })})
    // console.log(issueState)
    // const MappingIssue = (() => {
    //     return(<PoliticalIssuesComponent />)
    // })

    return (
        <div>
            <div>
                <MappingIssue />
                {/* <MappedIssue /> */}
            </div>
            <div>
            {issueState.map((issue) => {
            return(
                <div>
                    {/* {issue[0]._id} */}
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