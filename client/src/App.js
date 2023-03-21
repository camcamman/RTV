import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './components/Auth/Auth'
import {userContext} from './components/context/UserProvider'
import Political from './components/PoliticalIssues'

export default function App(){
  const { token, logout } =  useContext(userContext)
  return (
    <div className="app">
      <Routes>
        <Route 
          path="/" 
          element={ token ? <Navigate to="/profile"/> : <Home />}
          // element={<Home />}
        />

        <Route
          path='PoliticalIssues'
          element={<Political/>}
        ></Route>
      </Routes>
    </div>
  )
}