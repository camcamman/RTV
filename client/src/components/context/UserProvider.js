import axios from "axios";
const { createContext, useState } = require("react");

export const userContext = createContext()

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default function UserProvider (props) {

    // localStorage.setItem("user", JSON.stringify(user))

    const initState = { 
        token: localStorage.getItem("token") || "",
        user: localStorage.getItem("user") || {}, 
        errMsg: ""
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
            const { user, token } = res.data
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))
            setUserState(prevUserState => ({
                ...prevUserState,
                user: user, 
                token
            }))
            console.log(userState)
        })
      .catch(err => handleAuthErr(err.response.data.errMsg))
    }

    
    function login(credentials){
        axios.post("/auth/login", credentials)
          .then(res => {
            const { user, token } = res.data
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user))
            setUserState(prevUserState => ({
              ...prevUserState,
              user,
              token
            }))
            console.log(userState)
          })
      .catch(err => handleAuthErr(err.response.data.errMsg))
    }

    function logout(){
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setUserState({
          user: {},
          token: "",
        })
    }

    function handleAuthErr(errMsg){
        setUserState(prevState => ({
          ...prevState,
          errMsg
        }))
      }
    
      function resetAuthErr(){
        setUserState(prevState => ({
          ...prevState,
          errMsg: ""
        }))
      }

    return(
        <userContext.Provider
            value={{
                ...userState,
                signup,
                login,
                logout,
            }}>
            {props.children}
        </userContext.Provider>
    )
}