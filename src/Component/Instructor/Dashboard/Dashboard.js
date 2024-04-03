import React from 'react'
import SideBar from '../SideBar/SideBar'
import { Routes, Route } from "react-router-dom"
import Home from '../Home/Home'
import "./Dashboard.css"
import Header from '../Header/Header'
import CreateCourse from './../CreateCourse/CreateCourse';
import CreateArticles from './../CreateArticles/CreateArticles';
import CreateQuiz from './../CreateQuiz/CreateQuiz';

const Dashboard = () => {
  return (
    <div className='dashhead'>
      <div className='sidebar'>
        <SideBar />
      </div>

      <div>
        <div style={{ marginBottom: "10%" }}>
          <Header />
        </div>

        <div className='body'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/create-course' element={<CreateCourse />} />
            <Route path='/create-articles' element={<CreateArticles />} />
            <Route path='/create-quiz' element={<CreateQuiz />} />
            <Route />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default Dashboard