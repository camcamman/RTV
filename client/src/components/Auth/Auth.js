import React, { useState, useContext } from "react";
import AuthForm from "./AuthForm";
import { userContext } from "../context/UserProvider";

const initInputs = { username: "", password: "" }

export default function Home () {
    const [inputs, setInputs] = useState(initInputs)
    const [toggle, setToggle] = useState(true)

    const { signup } = useContext(userContext)

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

    return(
        <div>
            <form onSubmit={handleSignin}>
                <button>test</button>
            </form>
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
            />
          <button onClick={() => setToggle(prev => !prev)}>Not a member?</button>

            </>
        }
        </div>
    )
}