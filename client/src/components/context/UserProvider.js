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

    function handleAuthErr(errMsg){
        setUserState(prevUserState => ({
            ...prevUserState,
            errMsg
        }))
    }

    function signup(credentials){
        axios.post('/auth/signup', credentials)
        .then(res => {
            const { user, token} = res.data
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))
            setUserState(prevUserState => ({
                ...prevUserState,
                user, token
            }))
            console.log(userState)
        })
        // .then(res => console.log(res.data))
        .catch(err => handleAuthErr(err.response.data.errMsg))
    }

    function login(credentials){
        axios.post("/auth/login", credentials)
          .then(res => {
            const { user, token } = res.data
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user))
            // getUserTodos()
            setUserState(prevUserState => ({
              ...prevUserState,
              user,
              token
            }))
            console.log(userState)
          })
          .catch(err => console.log(err.response.data.errMsg))
      }

    function logout(){
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setUserState({
          user: {},
          token: "",
          todos: []
        })
      }

    return(
        <userContext.Provider
        value={{
            ...userState,
            signup,
            login,
            logout
        }}>
            {props.children}
        </userContext.Provider>
    )
}