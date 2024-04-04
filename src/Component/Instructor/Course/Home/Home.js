import React from 'react'
import { Routes, Route,useNavigate} from "react-router-dom"
import CreateCourse from '../CreateCourse/CreateCourse'
import AcceptedCourse from '../AcceptedCourse/AcceptedCourse'
import RejectedCourse from '../RejectedCourse/RejectedCourse'
import AllCourse from '../AllCourse/AllCourse'
import "./Home.css";

const Home = () => {
  const navigate=useNavigate();

  return (
    <div className='homehead'>
      <div className='head1'>
          <div onClick={()=>navigate("/home/dashboard/course/all-course")} style={{cursor:"pointer"}}>All Course</div>
          <div onClick={()=>navigate("/home/dashboard/course/accepted-course")} style={{cursor:"pointer"}}>Accepted Course</div>
          <div onClick={()=>navigate("/home/dashboard/course/rejected-course")} style={{cursor:"pointer"}}>Rejected Course</div>
          <div onClick={()=>navigate("/home/dashboard/course/create-course")} style={{cursor:"pointer"}}>Create Course</div>
      </div>
      <div className='head2'>
         <Routes>
             <Route path='/all-course' element={<AllCourse/>} />
             <Route path='/accepted-course' element={<AcceptedCourse />} />
             <Route path='/rejected-course' element={<RejectedCourse />} />
             <Route path='/create-course' element={<CreateCourse />} />
         </Routes>
      </div>
    </div>
  )
}

export default Home