import React from 'react';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getData, baseURL, postData, patchData } from '../../config/config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoEyeOutline } from "react-icons/io5";
import { FaRegBookmark } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa6";


const DoubtById = () => {
  const location = useLocation();
  const { id } = location.state || {};

  const [apidata, setApidata] = useState({});
  const [totalLikes, setTotalLikes] = useState();
  const [totalDislikes, setTotalDislikes] = useState();
  const [totalViews, setTotalViews] = useState();
  const [savedBlog, setSavedBlog] = useState(false);



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
        setSavedBlog(response?.data?.data?.saved_status);
      } else {
        console.log(response);
      }
    };

    window.scrollTo(0, 0);
    fetchdata();


  }, [id, totalLikes, totalDislikes]);

  // useEffect(() => {
  //   const fetchdata1 = async () => {
  //     let blog_id = id;
  //     const headers = {
  //       "x-blog-id": blog_id,
  //     };

  //     const response = await patchData('user/auth/blog/total-view-by-blog-id', {}, headers);
  //     if (response?.data?.success) {
  //       setTotalViews(response?.data?.data?.totalViews);
  //       console.log("view increases by 1");
  //     } else {
  //       console.log(response);
  //     }
  //   };

  //   fetchdata1();
  // }, []);


  const handlelike = async () => {

    let blog_id = id;
    const headers = {
      "x-blog-id": blog_id,
    };

    const response = await postData('user/auth/blog/like-blog', {}, headers);
    if (response?.data?.success) {
      setTotalLikes(response?.data?.data?.totalLikes);
      toast.success("Liked the blog");
    } else if (response?.response?.data?.status === 409) {
      console.log(response);
      toast.error(response?.response?.data?.message);
    } else {
      console.log(response);
      toast.error("Something went wrong");
    }
  }

  const handledislike = async () => {

    let blog_id = id;
    const headers = {
      "x-blog-id": blog_id,
    };

    const response = await postData('user/auth/blog/dislike-blog', {}, headers);
    if (response?.data?.success) {
      setTotalDislikes(response?.data?.data?.totalDislikes);
      toast.success("Disliked the blog");
    } else if (response?.response?.data?.status === 409) {
      console.log(response);
      toast.error(response?.response?.data?.message);
    } else {
      console.log(response);
      toast.error("Something went wrong");
    }
  }

  const handlesaveblog = async () => {

    let blog_id = id;
    const headers = {
      "x-blog-id": blog_id,
    };

    const response = await postData('user/auth/blog/saved-blog', {}, headers);
    if (response?.data?.success) {
      setSavedBlog(true);
      toast.success("blog saved successfully");
    } else if (response?.response?.data?.status === 409) {
      setSavedBlog(true);
      console.log(response);
      toast.error(response?.response?.data?.message);
    } else {
      console.log(response);
      toast.error("Something went wrong");
    }
  }

  const handleUnsaveblog = async () => {

    let blog_id = id;
    const headers = {
      "x-blog-id": blog_id,
    };

    const response = await postData('user/auth/blog/unsaved-blog', {}, headers);
    if (response?.data?.success) {
      setSavedBlog(false);
      toast.success("blog Unsaved successfully");
    } else if (response?.response?.data?.status === 409) {
      setSavedBlog(false);
      console.log(response);
      toast.error(response?.response?.data?.message);
    } else {
      console.log(response);
      toast.error("Something went wrong");
    }
  }

  const instructorPhotoPath = apidata?.instructor_photo ? apidata.instructor_photo.split('/uploads/')[1] : '';

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans">
      <ToastContainer />
      <div className='flex flex-row gap-10'>
        <h1 className="text-4xl font-bold mb-6 text-center">{apidata?.title}</h1>
        <div className='flex '>
          <IoEyeOutline style={{ marginTop: 10, marginRight: 5 }} size={"20px"} /> <span style={{ marginTop: 8, fontWeight: 'bold' }}>({totalViews})</span>
        </div>
      </div>

      <div className=' ml-10 mt-[12%] absolute cursor-pointer'>
        {
          savedBlog ?
            <>
               <FaBookmark size={"40px"} onClick={handleUnsaveblog} />
            </>
            :
            <>
               <FaRegBookmark size={"40px"} onClick={handlesaveblog} />
            </>
        }
      </div>

      <img
        src={`${baseURL}/${apidata?.got_error_image}`}
        alt="Thumbnail Not Found"
        className="w-4/5 mx-auto mb-6 object-cover rounded"
        style={{ maxHeight: 500, maxWidth: 450 }}
      />
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-3/4 mb-6 lg:mb-0">
          <div className="prose lg:prose-xl mb-6">
            <p>What I Tried: {apidata?.what_try_what_get}</p>
          </div>

          <div className="prose lg:prose-xl mb-6">
            <p>Details Problem: {apidata?.detail_problems}</p>
          </div>
          <div className="flex space-x-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handlelike}>Like ({totalLikes})</button>
            <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handledislike}>Dislike ({totalDislikes})</button>
          </div>
        </div>

      </div>

      <div className="w-full h-1 bg-gray-500 my-[4%]"></div>

      <div className="lg:w-3/4 flex flex-col">
        <div className='flex flex-row gap-12'>
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
          {/* <img
            src={`${baseURL}/${instructorPhotoPath}`}
            alt="Instructor"
            className="w-20 h-20 object-cover rounded-full border-4 border-gray-300 mb-4"
          /> */}
        </div>

      </div>
    </div>
  );
}

export default DoubtById;
