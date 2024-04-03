import React from 'react';
import { FaGithub, FaInstagram, FaYoutube } from "react-icons/fa";
import { BsLinkedin } from "react-icons/bs";
import './Footer.css';
import img1 from "./logo.jpg";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const handleClickAbout = () => {
    window.scrollTo(0, 0);
  };


  return (
    <footer>
      <div className="container">
        <div className="col-1">
          <img src={img1} alt="not found" />
          <p>Follow my Github account named Crazy-Coder07 and LinkedIn to see more of such projects and other posts. Also Like and share these posts. Also follow me on Instagram and Youtube. I hope you will like my content.</p>
        </div>
        <div className="col-2">
          <h3>Quick Links</h3>
          <ul>
            <li style={{ cursor: "pointer" }}><a onClick={() => (
              window.scrollTo(0, 0),
              navigate("/home/about"))}
            >About</a></li>

            <li style={{ cursor: "pointer" }}><a onClick={() => (
              window.scrollTo(0, 0),
              navigate("/home/contact"))}
            >Contact Us</a></li>

            <li style={{ cursor: "pointer" }}><a onClick={() => (
              window.scrollTo(0, 0),
              navigate("/home/privacy-policy"))}
            >Privacy & Policy</a></li>

            <li style={{ cursor: "pointer" }}><a onClick={() => (
              window.scrollTo(0, 0),
              navigate("/home/tnc"))}
            >Term & Condition</a></li>

            <li style={{ cursor: "pointer" }}><a onClick={() => (
              window.scrollTo(0, 0),
              navigate("/home/feedback"))}
            >FeedBack</a></li>
          </ul>
        </div>
        <div className="col-3">
          <h3>Services</h3>
          <ul>
            <li style={{ cursor: "pointer" }}>
              <a onClick={() => (
                window.scrollTo(0, 0),
                navigate("/home/courses"))}
              >Courses</a>
            </li>

            <li style={{ cursor: "pointer" }}>
              <a onClick={() => (
                window.scrollTo(0, 0),
                navigate("/home/article"))}
              >Top Articles</a>
            </li>

            <li style={{ cursor: "pointer" }}>
              <a onClick={() => (
                window.scrollTo(0, 0),
                navigate("/home/doubt"))}
              >Ask From Community</a>
            </li>

            <li style={{ cursor: "pointer" }}>
              <a onClick={() => (
                window.scrollTo(0, 0),
                navigate("/home/tnc"))}
              >Apply For Instructor</a>
            </li>

            <li style={{ cursor: "pointer" }}>
              <a onClick={() => (
                window.scrollTo(0, 0),
                navigate("/home/quiz"))}
              >Take a Skill Quiz</a>
            </li>

            <li style={{ cursor: "pointer" }}>
              <a onClick={() => (
                window.scrollTo(0, 0),
                navigate("/home/chat-bot"))}
              >Chat Bot</a>
            </li>

          </ul>
        </div>
        <div className="col-4">
          <h3>Newsletter</h3>
          <form>
            <i className="far fa-envelope"></i>
            <input type="email" placeholder="Enter your email" required />
            <button><i className="fas fa-arrow-right"></i></button>
          </form>
          <div className="social-icons">
            <a href="https://github.com/Crazy-Coder07"><FaGithub size={25} /></a>
            <a href="https://www.linkedin.com/in/aditya-ranjan-198aa1212/"><BsLinkedin size={25} /></a>
            <a href="https://www.instagram.com/itsaditya_ro45/"><FaInstagram size={25} /></a>
            <a href="www.youtube.com/@adventurelife1149"><FaYoutube size={25} /></a>
          </div>
        </div>
      </div>
      <div className="footer-2">
        <p>© 2024 | Made with ❤️ by LearningBit All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
