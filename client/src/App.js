import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './components/Auth/Auth'
import {userContext} from './components/context/UserProvider'
import Political from './components/PoliticalIssues'
import Navbar from './components/Navbar'
import { MainContext } from './components/context/mainFunctionContext'

export default function App(){
  const { token, logout } =  useContext(userContext)
  const { addNewIssue } = useContext(MainContext)
  return (
    <div className="app">
      <Navbar logout={logout}/>
      <Routes>
        <Route 
          path="/" 
          element={ token ? <Navigate to="/PoliticalIssues"/> : <Home />}
        />

        <Route
          path='PoliticalIssues'
          element={<Political 
            addNewIssue = {addNewIssue}
          />}
        ></Route>
      </Routes>
    </div>
  )
}