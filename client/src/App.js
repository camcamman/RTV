import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './components/Auth/Auth'
import {userContext} from './components/context/UserProvider'
import Political from './components/PoliticalIssues'
import Navbar from './components/Navbar'
import UserIssues from './components/UserIssues'
import ProtectedRoute from './components/protectedRoute'

export default function App(){
  const { token, logout } =  useContext(userContext)

  // console.log(user._id)

  return (
    <div className="app">
      <Navbar 
        logout={logout}/>

      <Routes>
        <Route 
          path="/" 
          element={ token ? <Navigate to={`/PoliticalIssues`}/> : <Home />}
        />

        {/* <Route
         path='/userIssues'
         element={<UserIssues/>}
        ></Route> */}

        <Route
          path='/PoliticalIssues'
          element={
            <ProtectedRoute
              token={token}
              redirectTo="/">

              <Political/>

            </ProtectedRoute>
          }
        ></Route>

        <Route
          path='/userIssues'
          element={
            <ProtectedRoute
              token={token}
              redirectTo="/">

              <UserIssues/>

            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </div>
  )
}