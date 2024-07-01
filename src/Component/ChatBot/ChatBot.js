import React, { useState } from 'react';
import { FaUserCircle, FaRobot } from "react-icons/fa";
import { VscSend } from "react-icons/vsc";
import { postData } from "../../config/config";

const ChatBot = () => {
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleEnter = async () => {
        if (inputValue.trim() !== '') {
            const newQuestion = { type: 'question', content: inputValue };
            setMessages(prevMessages => [...prevMessages, newQuestion]);
            setInputValue('');
            setLoading(true);

            const response = await postData("chatbot", { question: inputValue }, {});

            if (response?.data?.success) {
                const newAnswer = { type: 'answer', content: response?.data?.data };
                setMessages(prevMessages => [...prevMessages, newAnswer]);
                setLoading(false);
            }
        }
    };

    return (
        <div className="w-3/5 mx-auto my-1 flex-col">
            <div className="h-[65vh] overflow-y-auto border-2 border-gray-400 p-2 mt-[2%]">
                {messages.map((message, index) => (
                    <div key={index} className={message.type === 'question' ? 'question-message' : 'answer-message'}>
                        <div className="flex items-center">
                            <div>
                                {message.type === 'question' ? <FaUserCircle size={29} /> : <FaRobot size={29} />}
                            </div>
                            <div className="font-bold mt-2 ml-2">
                                {message.type === 'question' ? 'You' : 'ChatBot'}
                            </div>
                        </div>
                        <div className="ml-6">
                            {message.content.split('\n').map((line, index) => (
                                <div key={index}>{line}</div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex items-center mt-[1%]">
                <textarea
                    value={inputValue}
                    onChange={handleInputChange}
                    className="flex-1 border border-gray-300 p-2"
                    placeholder="Type your message here..."
                    rows={3}
                />
                <button onClick={handleEnter} className="bg-blue-500 text-white border-none p-2 ml-2">
                    <VscSend size={25}/>
                </button>
            </div>
        </div>
    );
};

export default ChatBot;
