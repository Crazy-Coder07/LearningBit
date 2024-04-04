import React from 'react'
import { useNavigate } from 'react-router-dom';
import { SlArrowLeftCircle } from "react-icons/sl";

const SideBar = () => {
    const navigate = useNavigate();

    return (
        <>
            <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
                <div
                    style={{
                        cursor:"pointer"
                    }}
                    onClick={() => navigate("/home")}
                >
                    <SlArrowLeftCircle
                        size={40}
                        color='white'
                    />
                </div>
                <div
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/home/dashboard/course/all-course")}
                >
                    Course
                </div>

                <div
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/home/dashboard/article/all-article")}
                >
                    Article
                </div>

                <div
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/home/dashboard/quiz/all-quiz")}
                >
                    Quiz
                </div>

                <div
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/home/dashboard/all-users")}
                >
                    All users
                </div>
            </div>
        </>
    )
}

export default SideBar