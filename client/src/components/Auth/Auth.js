import React, { useState } from "react";
import AuthForm from "./AuthForm";

const initInputs = { username: "", password: "" }

export default function Home () {
    const [inputs, setInputs] = useState(initInputs)
    const [toggle, setToggle] = useState(true)


    function handleChange () {}
    return(
        <div>
            {toggle ?
            <>
            <AuthForm/>
            <button onClick={() => setToggle(prev => !prev)}>Already a member?</button>
            </> 
            :
            <>
            <AuthForm/>
          <button onClick={() => setToggle(prev => !prev)}>Not a member?</button>

            </>
        }
        </div>
    )
}