import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { SlArrowLeftCircle } from "react-icons/sl";
import "./SideBar.css";

const SideBar = () => {
    const navigate = useNavigate();
    const [selectSidebar,setSelectsidebar]=useState(1);

    return (
        <>
            <div className='sidehead'>
                <div
                    className='sidehead1'
                    onClick={() => navigate("/home")}
                >
                    <SlArrowLeftCircle
                        size={40}
                        color='white'
                    />
                </div>
                <div
                    className='sidehead2'
                    onClick={() =>{
                         navigate("/home/dashboard/course/all-course")
                         setSelectsidebar(1)
                    }}
                    style={{ backgroundColor: selectSidebar === 1 ? '#3B82F6' : '',padding:"10%",marginLeft:"-3%"}}
                >
                    Course
                </div>

                <div
                    className='sidehead3'
                    onClick={() =>{
                        navigate("/home/dashboard/article/all-article")
                        setSelectsidebar(2)
                    }}
                    style={{ backgroundColor: selectSidebar === 2 ? '#3B82F6' : '', padding:"10%",marginLeft:"-3%" }}
                >
                    Article
                </div>

                <div
                    className='sidehead4'
                    onClick={() => {
                        navigate("/home/dashboard/quiz/all-quiz")
                        setSelectsidebar(3)
                    }}
                    style={{ backgroundColor: selectSidebar === 3 ? '#3B82F6' : '' ,padding:"10%",marginLeft:"-3%"}}

                >
                    Quiz
                </div>
                
                <div
                    className='sidehead5'
                    onClick={() => { 
                         navigate("/home/dashboard/all-users")
                         setSelectsidebar(4)
                    }}
                    style={{ backgroundColor: selectSidebar === 4 ? '#3B82F6' : '',padding:"10%",marginLeft:"-3%" }}
                >
                    All users
                </div>

                <div
                    className='sidehead5'
                    onClick={() => {
                        navigate("/home/dashboard/reports")
                        setSelectsidebar(5)
                    }}
                    style={{ backgroundColor: selectSidebar === 5 ? '#3B82F6' : '',padding:"10%",marginLeft:"-3%" }}
                >
                    Reports
                </div>
            </div>
        </>
    )
}

export default SideBar