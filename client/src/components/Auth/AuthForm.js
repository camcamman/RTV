import React from "react";
// import "../../authForm.css";
// import "../..styles/authForm.css";
import "../../styles/authForm.css";
// import ".../styles/authForm.css";

export default function AuthForm(props) {
  const {
    handleChange,
    buttonText,
    handleSubmit,
    inputs: { username, password },
    errMsg,
  } = props;

  return (
    <div className="auth-form-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          className="auth-input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={handleChange}
          name="username"
          required
        />

        <input
          className="auth-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={handleChange}
          name="password"
          required
        />
        <button className="auth-button">{buttonText}</button>
      </form>
      {errMsg && <p className="auth-error">{errMsg}</p>}
    </div>
  );
}
