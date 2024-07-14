import React, { useEffect, useState } from 'react';
import { getData, baseURL } from '../../config/config';
import { useNavigate } from 'react-router-dom';

const Quizes = () => {
  const navigate = useNavigate();
  const [apidata, setApidata] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [clickstart, setClickstart] = useState(false);
  const [quizid, setQuizid] = useState(null);

  useEffect(() => {
    const fetchdata = async () => {
      const response = await getData('user/auth/quiz/get-all-quiz', {});
      if (response?.data?.success) {
        setApidata(response?.data?.data);
      } else {
        console.log(response);
      }
    };

    fetchdata();
  }, []);

  const quizstartfun = (id) => {
    setQuizid(id)
    setClickstart(true);
  };

  const handleAgree = () => {
    setClickstart(false);
    const id = quizid;
    navigate('/home/quiz-by-id', { state: { id } });
  };

  const handleDisagree = () => {
    setClickstart(false);
  };

  const filteredQuizzes = apidata.filter(quiz =>
    quiz.quiz_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center">
        <div className="w-full mb-4">
          <input
            type="text"
            className="w-full px-3 py-4 border rounded"
            placeholder="Search by quiz name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap justify-center -mx-4">
          {filteredQuizzes.map((quiz) => (
            <div key={quiz.quiz_id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-8">
              <div className="bg-gradient-to-r from-purple-300 to-purple-200 rounded-lg shadow-lg overflow-hidden flex flex-col min-h-full transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl">
                <div className="px-6 py-4 flex-grow">
                  <div className="font-bold text-2xl mb-2">{quiz?.quiz_name}</div>
                  <p className="text-gray-700 text-base mb-4">Instruction: {quiz?.instructions}</p>
                  <p className="text-gray-700 text-base">
                    Published on: {new Date(quiz.quiz_releasing_time).getDate()}{" "}
                    {new Date(quiz.quiz_releasing_time).toLocaleString("default", {
                      month: "short",
                    })}{" "}
                    {new Date(quiz.quiz_releasing_time).getFullYear()}
                  </p>
                </div>
                <div className="flex justify-center px-6 pb-4">
                  <button
                    className="bg-green-500 text-white px-5 py-2 rounded-full cursor-pointer hover:bg-green-600"
                    onClick={() => {
                      quizstartfun(quiz.quiz_id);
                    }}
                  >
                    Start
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      {clickstart && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-[54%] ">
            <h2 className="text-xl font-bold mb-4">Quiz Instructions</h2>
            <ul className="list-disc list-inside mb-4">
              <li>Read Carefully: Before starting this quiz, please read all the instructions carefully.</li>
              <li>Time Limit: The total time allocated for this quiz is 5 minutes.</li>
              <li>Total Question: There are total 4 question for each quizes and each question carries 5 Marks</li>
              <li>Maximum Marks: 20 </li>
              <li>Attempt All Questions: All questions are mandatory and should be attempted.</li>
              <li>Single Attempt: You are allowed only one attempt for this quiz.</li>
              <li>Each question has four options, and only one option is correct.</li>
            </ul>
            <div className="flex justify-end space-x-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600"
                onClick={handleDisagree}
              >
                Disagree
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600"
                onClick={handleAgree}
              >
                Agree
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Quizes;
