import React from "react";

export default function AuthForm (props) {

    const { handleChange } = props

    return(
        <>
            <form>
                <input
                    type="text"
                    placeholder="username"
                    onChange={handleChange}
                    name="username"
                >
                </input>

                <input
                    type="text"
                    placeholder="password"
                    onChange={handleChange}
                    name="password"
                >
                </input>
            </form>
        </>
    )
}