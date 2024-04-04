import React from 'react'
import { Routes, Route,useNavigate} from "react-router-dom"
import "./Home.css";
import AllQuiz from '../AllQuiz/AllQuiz'
import AcceptedQuiz from '../AcceptedQuiz/AcceptedQuiz'
import RejectedQuiz from '../RejectedQuiz/RejectedQuiz'
import CreateQuiz from '../CreateQuiz/CreateQuiz'

const Home = () => {
  const navigate=useNavigate();

  return (
    <div className='homehead'>
      <div className='head1'>
          <div onClick={()=>navigate("/home/dashboard/quiz/all-quiz")} style={{cursor:"pointer"}}>All Quiz</div>
          <div onClick={()=>navigate("/home/dashboard/quiz/accepted-quiz")} style={{cursor:"pointer"}}>Accepted Quiz</div>
          <div onClick={()=>navigate("/home/dashboard/quiz/rejected-quiz")} style={{cursor:"pointer"}}>Rejected Quiz</div>
          <div onClick={()=>navigate("/home/dashboard/quiz/create-quiz")} style={{cursor:"pointer"}}>Create Quiz</div>
      </div>
      <div className='head2'>
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