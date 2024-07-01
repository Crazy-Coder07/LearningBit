import React from 'react'
import "./HomeLink.css"
import Header from '../Component/Header/Header'
import { Routes, Route } from "react-router-dom";
import Footer from '../Component/Footer/Footer';
import Home from '../Component/HomeCourse/Home';
import NotFound from '../Component/NotFound/NotFound';
import Articles from '../Component/Articles/Articles';
import Doubts from '../Component/Doubts/Doubts';
import Quizes from '../Component/Quizes/Quizes';
import HomeCourse from '../Component/HomeCourse/Home';
import ChatBot from '../Component/ChatBot/ChatBot';
import Tnc from "../Component/PrivacyComponent/Tnc/Tnc"
import ContactUs from '../Component/PrivacyComponent/ContactUs/ContactUs';
import AboutUs from '../Component/PrivacyComponent/AboutUs/AboutUs';
import PrivacyPolicy from '../Component/PrivacyComponent/PrivacyPolicy/PrivacyPolicy';
import FeedBack from '../Component/FeedBack/FeedBack';
import InstructorIntro from '../Component/Instructor/InstructorIntro/InstructorIntro';
import EditProfile from './../Component/ProfileDetailsComponent/EditProfile/EditProfile';
import MyCart from './../Component/ProfileDetailsComponent/MyCart/MyCart';
import MyCourse from './../Component/ProfileDetailsComponent/MyCourse/MyCourse';
import MyDoubt from './../Component/ProfileDetailsComponent/MyDoubt/MyDoubt';
import Notification from '../Component/ProfileDetailsComponent/Notification/Notifications';
import QuizScore from '../Component/ProfileDetailsComponent/QuizScore/QuizScore';
import Reply from './../Component/ProfileDetailsComponent/Reply/Reply';
import SavedArticle from './../Component/ProfileDetailsComponent/SavedArticle/SavedArticle';
import Dashboard from '../Component/Instructor/Dashboard/Dashboard';
import { FaRobot } from "react-icons/fa";
import { FaCircle } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import InstructorApply from '../Component/Instructor/InstructorApply/InstructorApply';


const HomeLink = () => {

  const navigate = useNavigate();
  const location = useLocation();

  // Check if the current URL endpoint is '/home/chat-bot'
  const isChatBotPage = location.pathname === '/home/chat-bot';
  const isDashboardPage = location.pathname.startsWith('/home/dashboard');

  return (
    <>

      {
        !isDashboardPage && (
          <div className='header'>
            <Header />
          </div>
        )
      }

      <div className='body'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/courses' element={<HomeCourse />} />
          <Route path='/article' element={<Articles />} />
          <Route path='/doubt' element={<Doubts />} />
          <Route path='/quiz' element={<Quizes />} />
          <Route path='/chat-bot' element={<ChatBot />} />


          {/* instructor routes */}
          <Route path='/instructor-intro' element={<InstructorIntro />} />
          <Route path='/instructor-apply' element={<InstructorApply/>} />
          <Route path='/dashboard/*' element={<Dashboard />} />


          {/* privacy policies routes*/}
          <Route path='/feedback' element={<FeedBack />} />
          <Route path='/tnc' element={<Tnc />} />
          <Route path='/contact' element={<ContactUs />} />
          <Route path='/about' element={<AboutUs />} />
          <Route path='/privacy-policy' element={<PrivacyPolicy />} />


          {/* User Profiles routes */}
          <Route path='/edit-profile' element={<EditProfile />} />
          <Route path='/my-cart' element={<MyCart />} />
          <Route path='/my-course' element={<MyCourse />} />
          <Route path='/my-doubt' element={<MyDoubt />} />
          <Route path='/notification' element={<Notification />} />
          <Route path='/quiz-score' element={<QuizScore />} />
          <Route path='/reply' element={<Reply />} />
          <Route path='/saved-article' element={<SavedArticle />} />


          <Route path='/*' element={<NotFound />} />
        </Routes>
      </div>

      {
        !isChatBotPage && !isDashboardPage &&
        (
          <div className='chathead' onClick={() => navigate("/home/chat-bot")}>
            <div style={{ marginLeft: "-99%", marginTop: "-5%" }}>
              <FaCircle color='green' />
            </div>

            <div className='chatbottext'>
              <div style={{ marginLeft: "-7%" }}>
                <FaRobot size={30} />
              </div>
              <div style={{ marginLeft: "7%" }}>
                Ask From Our ChatBot
              </div>
            </div>
          </div>
        )
      }


      <div className='footer'>
        <Footer />
      </div>
    </>
  )
}

export default HomeLink