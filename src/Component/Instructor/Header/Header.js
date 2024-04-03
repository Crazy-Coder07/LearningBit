import React from 'react'
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate=useNavigate();

  return (
    <>
      <div className='studentpage'
         onClick={()=>navigate("/home/courses")}
        >
          Back to the Student Page
        </div>
    </>
  )
}

export default Header