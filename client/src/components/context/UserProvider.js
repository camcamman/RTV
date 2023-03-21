import axios from "axios";
// import { config } from "dotenv";
const { createContext, useState } = require("react");

export const userContext = createContext()

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
  })

export default function UserProvider (props) {

    // localStorage.setItem("token", token)
    localStorage.setItem("user", "JSON.stringify(user)")

    // const storageUser = localStorage.getItem("user")

    // if (storageUser) {
    //     const parsedUser = (localStorage.getItem("user"))
    //     // console.log(parsedUser)
    //     // console.log(JSON.parse(localStorage.getItem("user"))) 
    // }

    const initState = { 
        // user: JSON.parse(localStorage.getItem("user")) || {}, 
        token: localStorage.getItem("token") || "",
        user: localStorage.getItem("user") || {}, 
        // token: localStorage.getItem("token") || "",
        // user: {}, 
        // token: "", 
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
            // console.log(res)
            // console.log(res.data)
            // console.log(res.data.user)
            // console.log(res.data.token)
            // const user = res.data.user
            // const token = res.data.token
            const { user, token } = res.data
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))
            // console.log(user)
            setUserState(prevUserState => ({
                ...prevUserState,
                user: user, 
                token
            }))
            console.log(userState)
        })
        
        // .then (res => console.log(res.data))
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