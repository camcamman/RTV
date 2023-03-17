import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './components/Auth/Auth'

export default function App(){
  return (
    <div className="app">
      <Routes>
        <Route 
          path="/" 
          element={<Home/>}
        />
      </Routes>
    </div>
  )
}