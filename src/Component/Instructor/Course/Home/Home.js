import React, { useState,useEffect} from 'react'
import { Routes, Route, useNavigate } from "react-router-dom"
import CreateCourse from '../CreateCourse/CreateCourse'
import AcceptedCourse from '../AcceptedCourse/AcceptedCourse'
import RejectedCourse from '../RejectedCourse/RejectedCourse'
import AllCourse from '../AllCourse/AllCourse'
import "./Home.css";
import { useLocation } from 'react-router-dom'

const Home = () => {

   const location = useLocation();
   const data = location?.state?.data || null;
   const navigate = useNavigate();
   const [currentDiv, setCurrentDiv] = useState(1);

   useEffect(() => {
      if (data) {
        setCurrentDiv(1);
      }
    }, [data]);

   return (
      <div className='homehead'>
         <div className='homehead1'>
            <div
               className='child1'
               onClick={() => {
                  navigate("/home/dashboard/course/all-course");
                  setCurrentDiv(1);
               }}
               style={{ backgroundColor: currentDiv === 1 ? '#3B82F6' : '' }}
            >
               All Course
            </div>

            <div
               className='child2'
               onClick={() => {
                  navigate("/home/dashboard/course/accepted-course")
                  setCurrentDiv(2);
               }}
               style={{ backgroundColor: currentDiv === 2 ? '#3B82F6' : '' }}
            >Accepted Course</div>

            <div
               className='child3'
               onClick={() => {
                  navigate("/home/dashboard/course/rejected-course")
                  setCurrentDiv(3);
               }}
               style={{ backgroundColor: currentDiv === 3 ? '#3B82F6' : '' }}
            >Rejected Course</div>

            <div
               className='child4'
               onClick={() => {
                  navigate("/home/dashboard/course/create-course")
                  setCurrentDiv(4);
               }}
               style={{ backgroundColor: currentDiv === 4 ? '#3B82F6' : '' }}
            >Create Course</div>

         </div>

         <div className='homehead2'>
            <Routes>
               <Route path='/all-course' element={<AllCourse />} />
               <Route path='/accepted-course' element={<AcceptedCourse />} />
               <Route path='/rejected-course' element={<RejectedCourse />} />
               <Route path='/create-course' element={<CreateCourse />} />
            </Routes>
         </div>
      </div>
   )
}

export default Home