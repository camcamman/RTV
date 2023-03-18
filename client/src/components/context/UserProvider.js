import axios from "axios";
const { createContext, useState } = require("react");

export const userContext = createContext()

export default function UserProvider (props) {

    const initState = { 
        user:{},
        token: "",
        posts: []
    }

    const [userState, setUserState] = useState(initState)

    // function signup (cred) {
    //     axios.post("/auth/signup", cred)
    //     // .then(res => console.log(res))
    //     .then(res => console.log(res.data))
    //     .catch(err => console.log(err))
    //     // console.log(cred)
    //     // await axios.get("/issue")
    //     // .then(res => console.log(res))
    //     // .catch(err => console.log(err))
    //     // console.log(cred)
    // }

    function handleAuthErr(errMsg){
        setUserState(prevUserState => ({
            ...prevUserState,
            errMsg
        }))
    }

    function signup(credentials){
        axios.post('/auth/signup', credentials)
        // .then(res => {
        //     const { user, token} = res.data
        //     localStorage.setItem('token', token)
        //     localStorage.setItem('user', JSON.stringify(user))
        //     setUserState(prevUserState => ({
        //         ...prevUserState,
        //         user, token
        //     }))
        //     console.log(userState)
        // })
        .then(res => console.log(res.data))
        .catch(err => handleAuthErr(err.response.data.errMsg))
    }

    return(
        <userContext.Provider
        value={{
            ...userState,
            signup
        }}>
            {props.children}
        </userContext.Provider>
    )
}