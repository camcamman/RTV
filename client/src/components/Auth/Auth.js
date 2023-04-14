import React, { useState, useContext } from "react";
import AuthForm from "./AuthForm";
import { userContext } from "../context/UserProvider";

const initInputs = { username: "", password: "" }

export default function Home () {
  const [inputs, setInputs] = useState(initInputs);
  const [toggle, setToggle] = useState(true);

  const { signup, login, errMsg } = useContext(userContext);

  function handleChange(e){
    const {name, value} = e.target
    setInputs(prevInputs => ({ ...prevInputs, [name]: value }))
  }

  function handleSignin(e) {
    e.preventDefault()
    signup(inputs)
  }

  function handleLogin(e) {
    e.preventDefault()
    login(inputs)
  }

  return(
    <div className="home-container">
      <h1>Welcome to RTV!</h1>
      <div className="auth-form-container">
        {toggle ?
          <>
            <AuthForm
              handleChange={handleChange}
              handleSubmit={handleSignin}
              inputs={inputs}
              buttonText="Sign Up"
              errMsg = {errMsg}
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
              errMsg = {errMsg}
            />
            <button onClick={() => setToggle(prev => !prev)}>Not a member?</button>
          </>
        }
      </div>
    </div>
  )
}
