import React, { useState, useContext } from "react";
import AuthForm from "./AuthForm";
import { userContext } from "../context/UserProvider";

const initInputs = { username: "", password: "" }

export default function Home () {
    const [inputs, setInputs] = useState(initInputs)
    const [toggle, setToggle] = useState(true)

    const {
        signup,
        login
    } = useContext(userContext)

    function handleChange(e){
        const {name, value} = e.target
        setInputs(prevInputs => ({
          ...prevInputs,
          [name]: value
        }))
        // console.log(inputs)
    }

    function handleSignin (e) {
        e.preventDefault()
        signup(inputs)
    }

    function handleLogin (e) {
        e.preventDefault()
        login(inputs)
    }

    return(
        <div>
            {toggle ?
            <>
            <AuthForm
                handleChange={handleChange}
                handleSubmit={handleSignin}
                inputs={inputs}
                buttonText="Sign Up"
            />
            <button onClick={() => setToggle(prev => !prev)}>Already a member?</button>
            </> 
            :
            <>
            <AuthForm
                handleChange={handleChange}
                handleSubmit={handleLogin}
                inputs={inputs}
                buttonText="Log In"
            />
          <button onClick={() => setToggle(prev => !prev)}>Not a member?</button>

            </>
        }
        <h1>76</h1>
        <h1>2</h1>
        </div>
    )
}