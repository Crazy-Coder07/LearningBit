import React from 'react'
import { useNavigate } from 'react-router-dom'

const CreateCourse = () => {

  const navigate=useNavigate();
  return (
    <div style={{marginTop:"300px"}}>
      <h2>Create Course div</h2>
      <h4 onClick={()=>navigate("/home/dashboard/course/all-course",{state: { data:1 }})}>Create Course btn</h4>
    </div>
  )
}

export default CreateCourse