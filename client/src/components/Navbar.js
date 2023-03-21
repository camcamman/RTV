import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar(props){
  const { logout } = props
  return (
    <div className="navbar">
      <Link to="/">
        <button onClick={logout}>Logout</button>
        {/* <button>Logout</button> */}
      </Link>
    </div>
  )
}