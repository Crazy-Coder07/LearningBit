import React from 'react'
import SideBar from '../SideBar/SideBar'
import { Routes, Route } from "react-router-dom"
import "./Dashboard.css"
import CourseHome from '../Course/Home/Home';
import ArticleHome from '../Article/Home/Home';
import QuizHome from '../Quiz/Home/Home';
import AllUser from './../AllUser/AllUser';
import Report from '../Reports/Report';

const Dashboard = () => {
  return (
    <div className='dashhead'>
      <div className='sidebar'>
        <SideBar />
      </div>

        <div className='body'>
          <Routes>
            <Route path='/course/*' element={<CourseHome />} />
            <Route path='/article/*' element={<ArticleHome />} />
            <Route path='/quiz/*' element={<QuizHome />} />
            <Route path='/all-users' element={<AllUser />} />
            <Route path='/reports' element={<Report />} />
          </Routes>
        </div>
    </div>
  )
}

export default Dashboard