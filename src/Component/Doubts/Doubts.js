import React, { useEffect, useState } from 'react';
import { getData } from '../../config/config';
import { useNavigate } from 'react-router-dom';

const Doubts = () => {
  const navigate = useNavigate();
  const [apidata, setApidata] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchdata = async () => {
      const response = await getData('user/auth/doubt/get-all-doubt', {});
      if (response?.data?.success) {
        setApidata(response?.data?.data);
      } else {
        console.log(response);
      }
    };

    fetchdata();
  }, []);

  const doubtfun = (id) => {
    navigate('/home/doubt-by-id', { state: { id } });
  };

  const filteredData = apidata.filter(doubt =>
    doubt.doubt_title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 ml-[10%] mr-[10%]">
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Search doubts by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 p-2 rounded-lg w-1/2 mr-[13%]"
        />
        <button
          onClick={() => navigate('/home/ask-doubt')}
          className="bg-red-500 text-white p-2 rounded-lg"
        >
          Ask From Community
        </button>
      </div>

      {filteredData.map((doubt) => (
        <div
          key={doubt.doubt_id}
          className="border-b-2 border-gray-300 p-4 hover:bg-gray-50 cursor-pointer flex items-start space-x-20"
          onClick={() => doubtfun(doubt.doubt_id)}
        >
          <div className="flex flex-col items-center text-center space-y-2 w-20">
            <div className="text-gray-700 flex items-center space-x-1">
              <span>{doubt?.like_count}</span>
              <div className="text-xs text-gray-500">votes</div>
            </div>
            <div className="text-gray-700 flex items-center space-x-1">
              <span>{doubt?.total_answer}</span>
              <div className="text-xs text-gray-500">answers</div>
            </div>
            <div className="text-gray-700 flex items-center space-x-1">
              <span>{doubt.view_count}</span>
              <div className="text-xs text-gray-500">views</div>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-blue-500 text-lg font-semibold">
              {doubt.doubt_title}
            </h3>
            <p className="text-gray-600 text-sm truncate lg:w-[86%]">
              {doubt.Detail_Problems.length <= 160 ? doubt.Detail_Problems : (
                <>
                  {`${doubt.Detail_Problems.slice(0, 157)}`}
                  <br />
                  {`${doubt.Detail_Problems.slice(157, 317)}...`}
                </>
              )}
            </p>
            <div className="mt-2 text-gray-600 text-xs">
              {/* Placeholder for username */}
              Username
            </div>
          </div>
        </div>
      ))}
      {
        filteredData.length ===0 && (
          <div className='flex justify-center items-center h-screen text-3xl'>
             <strong>No Result Found !!</strong>
          </div>
        )
      }
    </div>
  );
};

export default Doubts;
