import React, { useContext } from 'react'
import { Routes, Route, Navigate, useParams } from 'react-router-dom'
import Home from './components/Auth/Auth'
import {userContext} from './components/context/UserProvider'
import Political from './components/PoliticalIssues'
import Navbar from './components/Navbar'
import { MainContext } from './components/context/mainFunctionContext'

export default function App(){
  const { token, logout, user } =  useContext(userContext)
  const { addNewIssue } = useContext(MainContext)

  // console.log(user._id)

  return (
    <div className="app">
      <Navbar logout={logout}/>
      <Routes>
        <Route 
          path="/" 
          element={ token ? <Navigate to={`/PoliticalIssues`}/> : <Home />}
          // element={ token ? <Navigate to={`/PoliticalIssues/${user._id}&${user.username}`}/> : <Home />}
          // element={ token ? <Navigate to={`/PoliticalIssues?userId=${user._id}&username=${user.username}`}/> : <Home />}
          // element={ token ? <Navigate to={`/PoliticalIssues/${user._id}/${user.username}`}/> : <Home />}
          // element={ token ? <Navigate to={`/PoliticalIssues`}/> : <Home />}
        />

        <Route
          // path='/PoliticalIssues?userId={id}&username={username}'
          // path='/PoliticalIssues/:id/:username'
          path='/PoliticalIssues'
          element={<Political 
            addNewIssue = {addNewIssue}
          />}
        ></Route>
      </Routes>
    </div>
  )
}