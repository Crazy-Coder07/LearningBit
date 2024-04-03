import React from 'react'
import "./Home.css"
import {useNavigate} from "react-router-dom"

const Home = () => {
  const navigate=useNavigate();

  return (
    <>
      <div className='homehead'>
        <div>Hello Instructor Welcome Back !! you made us Proud</div>
        
      </div>
    </>
  )
}

export default Home