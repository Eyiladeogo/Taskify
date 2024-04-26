import taskifyLogo from './assets/taskify.svg'
import './css/index.css'
import './css/App.css'
import './css/button.css'
import Footer from './Footer';
import Button from './Button';
import React from 'react';
import {Link} from 'react-router-dom';


function LandingPage() {

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
          <Link style={{display: "inline-block"}} to="/login">
          <Button className = "left-button" text = "Sign In"/>
          </Link>
          <Link style={{display: "inline-block"}} to="/register">
          <Button className="right-button" text= "Sign Up"/>
          </Link>
          
          
        </div>
      <Footer />
    </>
  )
}

export default LandingPage
