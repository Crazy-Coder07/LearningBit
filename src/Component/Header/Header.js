import React, { useState, useEffect } from 'react';
import "./Header.css";
import { GrCart } from "react-icons/gr";
import { LuUserCircle2 } from "react-icons/lu";
import { FaSortUp } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".hoverdiv") && isHovered) {
        setIsHovered(false);
      }
    };
    const handleClickInside = (event) => {
      if (event.target.closest(".hoverdiv") && isHovered) {
        setIsHovered(false);
      }
    };

    document.addEventListener("mouseleave", handleClickOutside);
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("click", handleClickInside);

    return () => {
      document.removeEventListener("mouseleave", handleClickOutside);
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("click", handleClickInside);
    };
  }, [isHovered]);

  return (
    <>
      <div className='head'>
        <div className='head1' onClick={() => navigate("/home/courses")}>
          <div style={{ cursor: "pointer" }}> Learning<span className='bit'>Bit</span></div>
        </div>
        <div className='head2'>
            <input type="text" placeholder="Search..." class="search-bar" />
            <button type="submit" class="search-button">Search</button>
        </div>

        <div style={{ display: "flex", flexDirection: "row", gap: "6%",marginTop:"0.2%"}}>

          <div className='head3' onClick={() => navigate("/home/courses")}>
            <div style={{ cursor: "pointer" }}>Courses</div>
          </div>
          <div className='head4' onClick={() => navigate("/home/article")}>
            <div style={{ cursor: "pointer" }}>Top Articles</div>
          </div>
          <div className='head9' onClick={() => navigate("/home/instructor-intro")}>
            <div style={{ cursor: "pointer" }}>Apply For Instructor</div>
          </div>
          <div className='head5' onClick={() => navigate("/home/doubt")}>
            <div style={{ cursor: "pointer" }}>Ask From Community</div>
          </div>
          <div className='head6' onClick={() => navigate("/home/quiz")}>
            <div style={{ cursor: "pointer" }}>Take a Skill Quiz</div>
          </div>
          <div className='head7'
            onMouseEnter={() => setIsHovered(false)}
          >
            <GrCart size={29} color='white' />
          </div>
          <div className='head8'
            onMouseEnter={() => setIsHovered(true)}
          >
            <LuUserCircle2 size={40} />
          </div>
        </div>


      </div>
      <div onMouseLeave={() => setIsHovered(false)}>
        {isHovered && (
          <>
            <div className='hovericon'>
              <FaSortUp size={31} />
            </div>
            <div className='hoverdiv'>

              <div onClick={() => (
                navigate("/home/my-course")
              )}>
                My Courses
              </div>
              <div onClick={() => (
                navigate("/home/my-cart")
              )}>
                My Cart
              </div>
              <div onClick={() => (
                navigate("/home/dashboard/course/all-course")
              )}>
                Instructor Dashboard
              </div>
              <div onClick={() => (
                navigate("/home/quiz-score")
              )}>
                Quizes Score Card
              </div>
              <div onClick={() => (
                navigate("/home/saved-article")
              )}>
                Saved Article
              </div>
              <div onClick={() => (
                navigate("/home/my-doubt")
              )}>
                My Doubt
              </div>
              <div onClick={() => (
                navigate("/home/reply")
              )}>
                Reply
              </div>
              <div onClick={() => (
                navigate("/home/edit-profile")
              )}>
                Edit Profile
              </div>
              <div onClick={() => (
                navigate("/home/notification")
              )}>
                Notifications
              </div>
              <div onClick={()=>{
                localStorage.removeItem("accessToken")
                window.location.reload()
              }}>
                Log Out
              </div>
            </div>

          </>
        )}
      </div>
    </>
  )
}

export default Header;
