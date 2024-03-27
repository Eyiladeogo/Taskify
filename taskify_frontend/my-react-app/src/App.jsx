import { useState } from 'react'
import taskifyLogo from './assets/taskify.svg'
import './App.css'
import Footer from './Footer';
import Button from './Button';
import React from 'react';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <div className="logo-container">
            <img src={taskifyLogo} className="logo" alt="Taskify logo" />
        </div>
        <h1>Taskify</h1>
        <p>
          Gain insights and optimize your productivity with Taskify's powerful analytics tools.
        </p>
        <div className="card">
          <Button className = "left-button" text = "Sign In"/>
          <Button text= "Sign Up"/>
        </div>
      <Footer />
    </>
  )
}

export default App
