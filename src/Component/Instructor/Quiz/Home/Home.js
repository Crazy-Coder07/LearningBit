import React ,{useState} from 'react'
import { Routes, Route,useNavigate} from "react-router-dom"
import "./Home.css";
import AllQuiz from '../AllQuiz/AllQuiz'
import AcceptedQuiz from '../AcceptedQuiz/AcceptedQuiz'
import RejectedQuiz from '../RejectedQuiz/RejectedQuiz'
import CreateQuiz from '../CreateQuiz/CreateQuiz'

const Home = () => {
  const navigate=useNavigate();
  const [currentDiv, setCurrentDiv] = useState(1);

  return (
    <div className='homehead'>
      <div className='homehead1'>
            <div
               className='child1'
               onClick={() => {
                  navigate("/home/dashboard/quiz/all-quiz");
                  setCurrentDiv(1);
               }}
               style={{ backgroundColor: currentDiv === 1 ? '#3B82F6' : '' }}
            >
               All Quiz
            </div>

            <div
               className='child2'
               onClick={() => {
                  navigate("/home/dashboard/quiz/accepted-quiz")
                  setCurrentDiv(2);
               }}
               style={{ backgroundColor: currentDiv === 2 ? '#3B82F6' : '' }}
            >Accepted Quiz</div>

            <div
               className='child3'
               onClick={() => {
                  navigate("/home/dashboard/quiz/rejected-quiz")
                  setCurrentDiv(3);
               }}
               style={{ backgroundColor: currentDiv === 3 ? '#3B82F6' : '' }}
            >Rejected Quiz</div>

            <div
               className='child4'
               onClick={() => {
                  navigate("/home/dashboard/quiz/create-quiz")
                  setCurrentDiv(4);
               }}
               style={{ backgroundColor: currentDiv === 4 ? '#3B82F6' : '' }}
            >Create Quiz</div>

         </div>
      <div className='homehead2'>
         <Routes>
             <Route path='/all-quiz' element={<AllQuiz/>} />
             <Route path='/accepted-quiz' element={<AcceptedQuiz />} />
             <Route path='/rejected-quiz' element={<RejectedQuiz />} />
             <Route path='/create-quiz' element={<CreateQuiz />} />
         </Routes>
      </div>
    </div>
  )
}

export default Home