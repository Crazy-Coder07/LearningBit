import React, { useEffect, useState } from 'react';
import { getData, baseURL } from '../../config/config';
import { IoEyeOutline } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { FcLike } from "react-icons/fc";



const Articles = () => {

  const navigate = useNavigate();
  const [apidata, setApidata] = useState([]);
  

  useEffect(() => {
    const fetchdata = async () => {
      const response = await getData('user/auth/blog/get-all-blog', {});
      if (response?.data?.success) {
        setApidata(response?.data?.data);
      } else {
        console.log(response);
      }
    };

    fetchdata();
  }, []);

  const articlefun = (id) => {
    navigate('/home/article-by-id', { state: { id } });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex">
        <aside className="w-1/4 px-4">
          <h2 className="text-xl font-bold mb-4">Filter</h2>
          <ul>
            {['All', 'Aws', 'Azure', 'Business', 'C sharp', 'Cloud', 'Data', 'Developer experience', 'Devops', 'Docker', 'Engineering leadership', 'Guides', 'It ops'].map((topic) => (
              <li key={topic} className="mb-2">
                <label className="inline-flex items-center">
                  <input type="checkbox" className="form-checkbox" />
                  <span className="ml-2">{topic}</span>
                </label>
              </li>
            ))}
          </ul>
        </aside>
        <main className="w-3/4 px-4">
          <h2 className="text-xl font-bold mb-4">Viewing {apidata.length} Blogs</h2>
          <div className="flex flex-wrap -mx-4">
            {apidata.map((blog) => (
              <div key={blog.blog_id} className="w-1/3 px-4 mb-8">
                <div className="max-w-sm rounded overflow-hidden shadow-xl min-h-full flex flex-col transition duration-300 ease-in-out transform hover:scale-105 hover:opacity-90 group">
                  <div className="relative">
                    <img
                      src={`${baseURL}/${blog?.title_image}`}
                      alt="Thumbnail Not Found"
                      className="object-cover p-5"
                      style={{ maxHeight: 300, minHeight: 300 }}
                    />
                    <div className="absolute top-0 right-0 p-2 flex items-center z-10 bg-opacity-70 rounded">
                      <IoEyeOutline
                        size={"30px"}
                        style={{ paddingRight: "5px" }}
                        className="text-gray-600 group-hover:text-blue-400 transition-colors duration-300"
                      />
                      {blog?.views_count}
                      {/* <IoEyeSharp /> */}
                    </div>
                  </div>

                  <div className="px-6 py-4 flex-grow">
                    <div className="font-bold text-xl mb-2">{blog?.blog_title}</div>
                    <p className="text-gray-700 text-base">Author: {blog?.instructor_name}</p>
                    <p className="text-gray-700 text-base">
                      Published on: {new Date(blog.publication_date).getDate()}{" "}
                      {new Date(blog.publication_date).toLocaleString("default", {
                        month: "short",
                      })}{" "}
                      {new Date(blog.publication_date).getFullYear()}
                    </p>
                    <div className="text-gray-700 text-base flex items-center">
                      <FcLike className="mr-2" size={"26px"} /> {blog?.like_count}
                    </div>
                  </div>
                  <div
                    className="flex items-center mt-[-16px] px-6 pb-2 text-center text-[1.2rem] text-red-500 font-bold cursor-pointer"
                    onClick={() => {
                      articlefun(blog.blog_id);
                    }}
                  >
                    More Details <IoIosArrowForward />
                  </div>
                </div>

              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Articles;
