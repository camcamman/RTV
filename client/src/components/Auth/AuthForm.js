import React from "react";

export default function AuthForm (props) {

    const {
        handleChange,
        buttonText,
        handleSubmit,
        inputs: {username, password}
    } = props

    return(
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={handleChange}
                    name="username"
                    required
                >
                </input>

                <input
                    type="text"
                    placeholder="password"
                    value={password}
                    onChange={handleChange}
                    name="password"
                    required
                >
                </input>
                <button> {buttonText} </button>
            </form>
        </>
    )
}