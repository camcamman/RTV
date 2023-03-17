import React, { useState } from "react";
import AuthForm from "./AuthForm";

const initInputs = { username: "", password: "" }

export default function Home () {
    const [inputs, setInputs] = useState(initInputs)
    const [toggle, setToggle] = useState(true)

    function handleChange(e){
        const {name, value} = e.target
        setInputs(prevInputs => ({
          ...prevInputs,
          [name]: value
        }))
        console.log(inputs)
    }

    return(
        <div>
            {toggle ?
            <>
            <AuthForm
                handleChange={handleChange}
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