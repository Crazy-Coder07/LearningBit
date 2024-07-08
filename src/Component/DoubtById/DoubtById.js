import React from 'react';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getData, baseURL, postData, patchData } from '../../config/config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoEyeOutline } from "react-icons/io5";

const DoubtById = () => {
  const location = useLocation();
  const { id } = location.state || {};

  const [apidata, setApidata] = useState({});
  const [totalLikes, setTotalLikes] = useState();
  const [totalDislikes, setTotalDislikes] = useState();
  const [totalViews, setTotalViews] = useState();
  const [allAnswers, setAllAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState('');

  useEffect(() => {
    const fetchdata = async () => {
      let doubt_id = id;
      const headers = {
        "x-doubt-id": doubt_id,
      };

      const response = await getData('user/auth/doubt/get-doubt-by-id', headers);
      if (response?.data?.success) {
        setApidata(response?.data?.data);
        setTotalLikes(response?.data?.data?.total_likes);
        setTotalDislikes(response?.data?.data?.total_dislikes);
        setTotalViews(response?.data?.data?.view_count);
      } else {
        console.log(response);
      }
    };

    window.scrollTo(0, 0);
    fetchdata();
  }, [id, totalLikes, totalDislikes]);

  useEffect(() => {
    const fetchdata = async () => {
      let doubt_id = id;
      const headers = {
        "x-doubt-id": doubt_id,
      };

      const response = await getData('user/auth/doubt/get-all-reply-for-doubtid', headers);
      if (response?.data?.success) {
        setAllAnswers(response?.data?.data);
      } else {
        console.log(response);
      }
    };

    window.scrollTo(0, 0);
    fetchdata();
  }, [id,newAnswer]);


  useEffect(() => {
    const fetchdata1 = async () => {
      let doubt_id = id;
      const headers = {
        "x-doubt-id": doubt_id,
      };

      const response = await patchData('user/auth/doubt/total-view-by-doubt-id', {}, headers);
      if (response?.data?.success) {
        setTotalViews(response?.data?.data?.totalViews);
        console.log("view increases by 1");
      } else {
        console.log(response);
      }
    };

    fetchdata1();
  }, [id]);

  const handlelike = async () => {
    let doubt_id = id;
    const headers = {
      "x-doubt-id": doubt_id,
    };

    const response = await postData('user/auth/doubt/like-doubt', {}, headers);
    if (response?.data?.success) {
      setTotalLikes(response?.data?.data?.totalLikes);
      toast.success("Liked the doubt");
    } else if (response?.response?.data?.status === 409) {
      console.log(response);
      toast.error(response?.response?.data?.message);
    } else {
      console.log(response);
      toast.error("Something went wrong");
    }
  }

  const handledislike = async () => {
    let doubt_id = id;
    const headers = {
      "x-doubt-id": doubt_id,
    };

    const response = await postData('user/auth/doubt/dislike-doubt', {}, headers);
    if (response?.data?.success) {
      setTotalDislikes(response?.data?.data?.totalDislikes);
      toast.success("Disliked the doubt");
    } else if (response?.response?.data?.status === 409) {
      console.log(response);
      toast.error(response?.response?.data?.message);
    } else {
      console.log(response);
      toast.error("Something went wrong");
    }
  }

  const handleReply = async () => {
    let doubt_id = id;
    const headers = {
      "x-doubt-id": doubt_id,
    };
    const body = {
      answer: newAnswer
    };

    const response = await postData('user/auth/doubt/reply-doubt', body, headers);
    if (response?.data?.success) {
      toast.success("Replied successfully");
      setNewAnswer('');  // Clear the textarea after successful reply
      setAllAnswers([...allAnswers, response.data.data]);  // Add the new answer to the list of all answers
    } else {
      console.log(response);
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="p-6 font-sans">
      <ToastContainer />
      <div className='flex flex-row'>
        <div className='flex-[3]'>
          <div className='flex flex-row gap-10'>
            <h1 className="text-4xl font-bold mb-6 text-center">{apidata?.title}</h1>
            <div className='flex '>
              <IoEyeOutline style={{ marginTop: 10, marginRight: 5 }} size={"20px"} /> <span style={{ marginTop: 8, fontWeight: 'bold' }}>({totalViews})</span>
            </div>
          </div>

          <img
            src={`${baseURL}/${apidata?.got_error_image}`}
            alt="Thumbnail Not Found"
            className="w-4/5 mx-auto mb-6 object-cover rounded"
            style={{ maxHeight: 500, maxWidth: 450 }}
          />
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-full mb-6 lg:mb-0">
              <div className="prose lg:prose-xl mb-6">
                <strong className='font-bold text-2xl'>What I Tried :</strong>
                <p>{apidata?.what_try_what_get}</p>
              </div>

              <div className="prose lg:prose-xl mb-6">
                <strong className='font-bold text-2xl'>Details Problem:</strong>
                <p>{apidata?.detail_problems}</p>
              </div>
              <div className="flex space-x-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handlelike}>Like ({totalLikes})</button>
                <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handledislike}>Dislike ({totalDislikes})</button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-[1] flex flex-col mt-[10%] pl-4">
          <div className='flex flex-row gap-3'>
            <div>
              <p className="text-xl font-semibold">Asked By : {apidata?.student_name}</p>

              <p className="text-gray-600"> Posted Date :
                {apidata?.postdate && (
                  new Date(apidata.postdate).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })
                )}
              </p>
            </div>
            <img
              src={`${baseURL}/${apidata?.student_photo}`}
              alt="Instructor"
              className="w-20 h-20 object-cover rounded-full border-4 border-gray-300 mt-[-3%]"
            />
          </div>
        </div>
      </div>

      <div className="w-full my-6">
        <textarea 
          className="w-full p-4 border rounded-lg"
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
          placeholder="Write your answer here..."
        />
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2 float-right"
          onClick={handleReply}
        >
          Reply
        </button>
      </div>

      {/* Displaying All Answers */}
      <div className="mt-10 ml-[30%]">
        <h2 className="text-2xl font-bold mb-4">Answers:</h2>
        {allAnswers.length > 0 ? (
          allAnswers.map((answer, index) => (
            <div key={index} className="flex mb-6 bg-gray-100 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <img
                src={`${baseURL}/${answer.student_photo}`}
                alt="Student"
                className="w-20 h-20 object-cover rounded-full border-4 border-gray-300"
              />
              <div className="ml-4">
                <p className="text-lg font-semibold">{answer.student_name}</p>
                <p className="text-gray-600 mb-2">
                  {new Date(answer.post_date).toLocaleString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true,
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </p>
                <p>{answer.sanswer}</p>
              </div>
            </div>

          ))
        ) : (
          <p>No answers yet.</p>
        )}
      </div>
    </div>
  );
}

export default DoubtById;
