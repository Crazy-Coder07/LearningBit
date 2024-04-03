import React from 'react'
import { useNavigate } from 'react-router-dom';

const SideBar = () => {
    const navigate=useNavigate();

    return (
        <>
            <div style={{display:"flex",flexDirection:"column",gap:"30px"}}>
                <div 
                style={{cursor:"pointer"}}
                  onClick={()=>navigate("/home/dashboard/create-course")}
                >
                    Course
                </div>

                <div 
                   style={{cursor:"pointer"}}
                   onClick={()=>navigate("/home/dashboard/create-articles")}
                >
                    Article
                </div>

                <div 
                   style={{cursor:"pointer"}}
                   onClick={()=>navigate("/home/dashboard/create-quiz")}
                >
                    Quiz
                </div>
            </div>
        </>
    )
}

export default SideBar