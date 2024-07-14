import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
import { getData, patchData, postData } from '../../config/config';

const QuizesById = () => {
    const location = useLocation();
    const navigate=useNavigate();
    const { id } = location.state || {};
    const [apidata, setApidata] = useState([]);
    const [timeLeft, setTimeLeft] = useState(300);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        const fetchdata = async () => {
            let quiz_id = id;
            const headers = {
                "x-quiz-id": quiz_id,
            };

            const response = await getData('user/auth/quiz/get-quiz-by-id', headers);
            if (response?.data?.success) {
                setApidata(response?.data?.data);
            } else {
                console.log(response);
            }
        };
        fetchdata();
    }, [id]);

    useEffect(() => {
        if (timeLeft <= 0) {
            submittestfun();
            return; // Stop the timer when it reaches 0
        }
        const timer = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleOptionClick = (questionId, selectedOption, correctAnswer) => {
        setSelectedOptions(prevState => ({
            ...prevState,
            [questionId]: {
                selected: selectedOption,
                isCorrect: selectedOption === correctAnswer
            }
        }));
    };

    const calculateResults = () => {
        const totalQuestions = apidata.length;
        const correctAnswers = Object.values(selectedOptions).filter(option => option.isCorrect).length;
        const totalMarks = apidata.reduce((acc, question) => acc + question.question_marks, 0);
        const obtainedMarks = apidata.reduce((acc, question) => {
            const selectedOption = selectedOptions[question.question_id];
            return selectedOption && selectedOption.isCorrect ? acc + question.question_marks : acc;
        }, 0);
        const percentage = (obtainedMarks / totalMarks) * 100;

        return {
            totalQuestions,
            correctAnswers,
            obtainedMarks,
            totalMarks,
            percentage
        };
    };

    const submittestfun = async () => {
        let quiz_id = id;
        const headers = {
            "x-quiz-id": quiz_id,
        };

        const response = await postData('user/auth/quiz/enrolled-quiz', {}, headers);
        if (response?.data?.success) {
            console.log("Enrolled quiz successfully");
        } else {
            console.log(response);
        }

        const body = {
            "percentage_score": results.percentage.toFixed(2)
        }

        const response1 = await patchData('user/auth/quiz/Update-percentage-after-quiz', body, headers);
        if (response1?.data?.success) {
            console.log("Score updated successfully");
        } else {
            console.log(response1);
        }

        setShowResults(true);
    };

    const results = calculateResults();

    const handleClose = () => {
        setShowResults(false);
        navigate("/home/quiz");
    };

    return (
        <>
            <div className="flex flex-col justify-center mx-[20%] my-5">
                <h1 className="text-5xl font-bold mb-6 text-center">Subject: {apidata.length > 0 && apidata[0].quiz_name}</h1>
                <div className="text-xl font-semibold mb-4 text-center">
                    Time Left: {formatTime(timeLeft)}
                </div>
                {apidata.length > 0 ? (
                    apidata.map((quiz, index) => (
                        <div key={index} className="bg-white rounded shadow p-[4%] mb-6">
                            <div className='flex flex-row justify-between'>
                                <h3 className="text-lg font-semibold mb-1">{index + 1}) {quiz.question_name}</h3>
                                <p className="mb-2">Marks: {quiz.question_marks}</p>
                            </div>

                            <div className="mb-3 ml-5">
                                <ul className="list-inside">
                                    {JSON.parse(quiz.options).map((option, idx) => (
                                        <li
                                            key={option.id}
                                            className={`mb-2 cursor-pointer ${selectedOptions[quiz.question_id]?.selected === option.text
                                                ? selectedOptions[quiz.question_id]?.isCorrect
                                                    ? 'text-green-500'
                                                    : 'text-red-500'
                                                : ''}`}
                                            onClick={() => handleOptionClick(quiz.question_id, option.text, quiz.answer)}
                                        >
                                            {String.fromCharCode(97 + idx)}. {option.text}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            {selectedOptions[quiz.question_id] && (
                                <>
                                    <p className="mb-2">
                                        {selectedOptions[quiz.question_id].isCorrect ? 'Correct' : 'Incorrect'}
                                    </p>
                                    <p className="mb-2">Answer: {quiz.answer}</p>
                                    <p className="mb-2">Explanation: {quiz.explanation}</p>
                                </>
                            )}
                        </div>
                    ))
                ) : (
                    <p>No quiz data found for the given ID.</p>
                )}
            </div>
            <div
                onClick={submittestfun}
                className='bg-blue-400 flex justify-center items-center w-[60%] h-12 mx-auto mt-4 rounded cursor-pointer'
            >
                Submit Test
            </div>

            {showResults && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-gray-200 p-5 rounded shadow-lg w-[50%]">
                        <h2 className="text-3xl font-bold mb-4 text-center">Quiz Results</h2>
                        <p>Total Questions: {results.totalQuestions}</p>
                        <p>Correct Answers: {results.correctAnswers}</p>
                        <p>Total Marks: {results.totalMarks}</p>
                        <p>Obtained Marks: {results.obtainedMarks}</p>
                        <p>Percentage: {results.percentage.toFixed(2)}%</p>
                        <button
                            onClick={handleClose}
                            className="bg-blue-500 text-white px-4 py-2 rounded mt-4 mx-auto block"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default QuizesById;
