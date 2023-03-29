import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar(props){
  const { logout, navButtonText, changeButtonText } = props
  
  function handleButton () {
    changeButtonText()
  }

  return (
    <div className="navbar">
      <Link to="/">
        <button onClick={logout}>Logout</button>
        {/* <button>Logout</button> */}
      </Link>

      <Link to="/userIssues">
        <button>See my issues</button>
      </Link>

      <Link to="/PoliticalIssues">
        <button>See all issues</button>
      </Link>
    </div>
  )
}