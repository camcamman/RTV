import axios from "axios";
const { createContext } = require("react");

export const MainContext = createContext()

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default function MainProvider (props) {

    function addNewIssue (newIssue, user_Id) {
        userAxios.post(`/issue/${user_Id}`, newIssue)
        .then(res => console.log("added"))
        .catch(err => console.error(err))
    }

    function upVoteIssue (issueId) {
        userAxios.put(`/issue/like/${issueId}`)
        .then(() => console.log("added"))
        .catch(err => console.error(err))
    }

    return(
        <MainContext.Provider
            value={{
                addNewIssue,
                upVoteIssue
                }}>
            {props.children}
        </MainContext.Provider>
    )
}