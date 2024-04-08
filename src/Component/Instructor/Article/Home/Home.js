import React,{useState} from 'react'
import { Routes, Route,useNavigate} from "react-router-dom"
import "./Home.css";
import AllArticle from '../AllArticle/AllArticle'
import AcceptedArticle from '../AcceptedArticle/AcceptedArticle'
import RejectedArticle from '../RejectedArticle/RejectedArticle'
import CreateArticle from '../CreateArticle/CreateArticle'

const Home = () => {
  const navigate=useNavigate();
  const [currentDiv, setCurrentDiv] = useState(1);
  
  return (
    <div className='homehead'>
      <div className='homehead1'>
            <div
               className='child1'
               onClick={() => {
                  navigate("/home/dashboard/article/all-article");
                  setCurrentDiv(1);
               }}
               style={{ backgroundColor: currentDiv === 1 ? '#3B82F6' : '' }}
            >
               All Article
            </div>

            <div
               className='child2'
               onClick={() => {
                  navigate("/home/dashboard/article/accepted-article")
                  setCurrentDiv(2);
               }}
               style={{ backgroundColor: currentDiv === 2 ? '#3B82F6' : '' }}
            >Accepted Article</div>

            <div
               className='child3'
               onClick={() => {
                  navigate("/home/dashboard/article/rejected-article")
                  setCurrentDiv(3);
               }}
               style={{ backgroundColor: currentDiv === 3 ? '#3B82F6' : '' }}
            >Rejected Article</div>

            <div
               className='child4'
               onClick={() => {
                  navigate("/home/dashboard/article/create-article")
                  setCurrentDiv(4);
               }}
               style={{ backgroundColor: currentDiv === 4 ? '#3B82F6' : '' }}
            >Create Article</div>

         </div>

      <div className='homehead2'>
         <Routes>
             <Route path='/all-article' element={<AllArticle/>} />
             <Route path='/accepted-article' element={<AcceptedArticle />} />
             <Route path='/rejected-article' element={<RejectedArticle />} />
             <Route path='/create-article' element={<CreateArticle />} />
         </Routes>
      </div>
    </div>
  )
}

export default Home