import React from 'react'
import { Routes, Route,useNavigate} from "react-router-dom"
import "./Home.css";
import AllArticle from '../AllArticle/AllArticle'
import AcceptedArticle from '../AcceptedArticle/AcceptedArticle'
import RejectedArticle from '../RejectedArticle/RejectedArticle'
import CreateArticle from '../CreateArticle/CreateArticle'

const Home = () => {
  const navigate=useNavigate();

  return (
    <div className='homehead'>
      <div className='head1'>
          <div onClick={()=>navigate("/home/dashboard/article/all-article")} style={{cursor:"pointer"}}>All Article</div>
          <div onClick={()=>navigate("/home/dashboard/article/accepted-article")} style={{cursor:"pointer"}}>Accepted Article</div>
          <div onClick={()=>navigate("/home/dashboard/article/rejected-article")} style={{cursor:"pointer"}}>Rejected Article</div>
          <div onClick={()=>navigate("/home/dashboard/article/create-article")} style={{cursor:"pointer"}}>Create Article</div>
      </div>

      <div className='head2'>
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