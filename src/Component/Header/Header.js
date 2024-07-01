import React, { useState, useEffect } from 'react';
import { GrCart } from "react-icons/gr";
import { LuUserCircle2 } from "react-icons/lu";
import { FaSortUp } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [sidebartab, setSidebartab] = useState(true);
  const [currentdiv,setCurrentdiv]=useState(1);

  if(sidebartab){
    localStorage.removeItem("sideTab");
  }

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
      <div className='head flex items-center justify-between px-3 py-2'>
        <div className='head1 text-lg font-bold'
          onClick={() => {
            navigate("/home/courses")
            setSidebartab(true)
            setCurrentdiv(1);
          }}>
          <span className='cursor-pointer'>Learning<span className='text-red-500'>Bit</span></span>
        </div>

        <div className='head2 flex items-center'>
          <input type="text" placeholder="Search..." className="search-bar px-2 py-1 border border-gray-300 rounded" />
          <button type="submit" className="search-button px-3 py-1 bg-blue-500 text-white rounded">Search</button>
        </div>

        <div className='head3 text-center '
          onClick={() => {
            navigate("/home/courses")
            setSidebartab(true)
            setCurrentdiv(1);
          }}
          >
          <span className='cursor-pointer' style={{ color: currentdiv === 1 ? '#6bed8d' : '',textDecoration: currentdiv === 1 ? 'underline':""    }}>Courses</span>
        </div>

        <div className='head4 text-center '
          onClick={() => {
            navigate("/home/article")
            setSidebartab(true)
            setCurrentdiv(2)
          }}>
          <span className='cursor-pointer' style={{ color: currentdiv === 2 ? '#6bed8d' : '', textDecoration: currentdiv === 2 ? 'underline':""  }} >Top Articles</span>
        </div>

        <div className='head9 text-center '
          onClick={() => {
            navigate("/home/instructor-intro")
            setSidebartab(true)
            setCurrentdiv(3)
          }}>
          <span className='cursor-pointer' style={{ color: currentdiv === 3 ? '#6bed8d' : '', textDecoration: currentdiv === 3 ? 'underline':""  }}>Apply For Instructor</span>
        </div>

        <div className='head5 text-center '
          onClick={() => {
            navigate("/home/doubt")
            setSidebartab(true)
            setCurrentdiv(4)
          }}>
          <span className='cursor-pointer' style={{ color: currentdiv === 4 ? '#6bed8d' : '', textDecoration: currentdiv === 4 ? 'underline':""    }}>Ask From Community</span>
        </div>

        <div className='head6 text-center ' 
             onClick={() => { 
              navigate("/home/quiz")
              setSidebartab(true)
              setCurrentdiv(5)
        }}>
          <span className='cursor-pointer' style={{ color: currentdiv === 5 ? '#6bed8d' : '', textDecoration: currentdiv === 5 ? 'underline':""  }}>Take a Skill Quiz</span>
        </div>

        <div className='head7' 
          onMouseEnter={() => setIsHovered(false)}
          onClick={()=>setCurrentdiv(6)}
        >
          <GrCart size={29} color='white' style={{ color: currentdiv === 6 ? '#6bed8d' : '' }}/>
        </div>
        
        <div className='head8' 
          onMouseEnter={() => setIsHovered(true)}
          onClick={()=>setCurrentdiv(7)}
        >
          <LuUserCircle2 size={40} style={{ color: currentdiv === 7 ? '#6bed8d' : '' }} />
        </div>
      </div>


      <div onMouseLeave={() => setIsHovered(false)}>
        {isHovered && (
          <>
            <div className='hovericon absolute right-[0%] top-[6.2%]'>
              <FaSortUp size={61} />
            </div>
            <div className='hoverdiv absolute top-[10%] w-[16%] right-[8.4%] transform translate-x-1/2 h-[74vh] bg-white flex flex-col justify-top shadow-md py-1 pl-1 overflow-y-auto gap-4'>
              <div
                onClick={() => {
                  navigate("/home/my-course")
                  localStorage.setItem("sideTab", "my course")
                  setSidebartab(false)
                }}
                className={`text-black h-[7%] pl-[5%] pt-[3%] hover:bg-green-400 hover:cursor-pointer w-97% rounded-lg ${localStorage.getItem("sideTab") == "my course" ? 'bg-green-400' : ''}`}
              >My Courses
              </div>

              <div
                onClick={() => {
                  navigate("/home/my-cart")
                  localStorage.setItem("sideTab", "my cart")
                  setSidebartab(false)
                }}
                className={`text-black h-[7%] pl-[5%] pt-[3%] hover:bg-green-400 hover:cursor-pointer w-97% rounded-lg ${localStorage.getItem("sideTab") === "my cart" ? 'bg-green-400' : ''}`}
              >My Cart
              </div>

              <div
                onClick={() => {
                  navigate("/home/dashboard/course/all-course")
                  localStorage.setItem("sideTab", "instructor dashboard")
                  setSidebartab(false)
                }}
                className={`text-black h-[7%] pl-[5%] pt-[3%] hover:bg-green-400 hover:cursor-pointer w-97% rounded-lg ${localStorage.getItem("sideTab") === "instructor dashboard" ? 'bg-green-400' : ''}`}
              >Instructor Dashboard
              </div>

              <div
                onClick={() => {
                  navigate("/home/quiz-score")
                  localStorage.setItem("sideTab", "quiz score card")
                  setSidebartab(false)
                }}
                className={`text-black h-[7%] pl-[5%] pt-[3%] hover:bg-green-400 hover:cursor-pointer w-97% rounded-lg ${localStorage.getItem("sideTab") === "quiz score card" ? 'bg-green-400' : ''}`}
              >Quizes Score Card
              </div>

              <div
                onClick={() => {
                  navigate("/home/saved-article")
                  localStorage.setItem("sideTab", "saved article")
                  setSidebartab(false)
                }}
                className={`text-black h-[7%] pl-[5%] pt-[3%] hover:bg-green-400 hover:cursor-pointer w-97% rounded-lg ${localStorage.getItem("sideTab") === "saved article" ? 'bg-green-400' : ''}`}
              >Saved Article
              </div>

              <div
                onClick={() => {
                  navigate("/home/my-doubt")
                  localStorage.setItem("sideTab", "my doubt")
                  setSidebartab(false)
                }}
                className={`text-black h-[7%] pl-[5%] pt-[3%] hover:bg-green-400 hover:cursor-pointer w-97% rounded-lg ${localStorage.getItem("sideTab") === "my doubt" ? 'bg-green-400' : ''}`}
              >My Doubt
              </div>

              <div
                onClick={() => {
                  navigate("/home/reply")
                  localStorage.setItem("sideTab", "reply")
                  setSidebartab(false)
                }}
                className={`text-black h-[7%] pl-[5%] pt-[3%] hover:bg-green-400 hover:cursor-pointer w-97% rounded-lg ${localStorage.getItem("sideTab") === "reply" ? 'bg-green-400' : ''}`}
              >Reply
              </div>

              <div
                onClick={() => {
                  navigate("/home/edit-profile")
                  localStorage.setItem("sideTab", "edit profile")
                  setSidebartab(false)
                }}
                className={`text-black h-[7%] pl-[5%] pt-[3%] hover:bg-green-400 hover:cursor-pointer w-97% rounded-lg ${localStorage.getItem("sideTab") === "edit profile" ? 'bg-green-400' : ''}`}
              >Edit Profile
              </div>

              <div
                onClick={() => {
                  navigate("/home/notification")
                  localStorage.setItem("sideTab", "notifications")
                  setSidebartab(false)
                }}
                className={`text-black h-[7%] pl-[5%] pt-[3%] hover:bg-green-400 hover:cursor-pointer w-97% rounded-lg ${localStorage.getItem("sideTab") === "notifications" ? 'bg-green-400' : ''}`}
              >Notifications
              </div>

              <div
                onClick={() => {
                  localStorage.removeItem("sideTab");
                  localStorage.removeItem("accessToken");
                  window.location.reload();
                }}
                className='text-black h-[7%] pl-[5%] pt-[3%] hover:bg-green-400 hover:cursor-pointer w-97% rounded-lg'
              >Log Out
              </div>

            </div>
          </>
        )}
      </div>
    </>
  )
}

export default Header;
