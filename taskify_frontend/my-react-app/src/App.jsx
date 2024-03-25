import { useState } from 'react'
import taskifyLogo from './assets/taskify.svg'
import './App.css'

const date = new Date().getFullYear();


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
          <a href="">
            <button className='left-button'>
              Sign In
            </button>
          </a>
          <a href="">
            <button>
                Sign Up
            </button>
          </a>
        </div>
      <footer>
        Adedayo Eyiladeogo &copy; {date}
      </footer>
    </>
  )
}

export default App
