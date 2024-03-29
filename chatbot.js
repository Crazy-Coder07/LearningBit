const { GoogleGenerativeAI } = require("@google/generative-ai");
const { returnServerRes } = require("./App/Helper");

const API_Key = process.env.API_KEY;
const genAI = new GoogleGenerativeAI(API_Key);

async function chatbot(req, res, next) {
  try {
      
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});

    const prompt = req.body.question;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    successMsg="got response successfully"
    return returnServerRes(res, 200, true,successMsg,text);
  } catch (error) {
    console.error("Error running chatbot:", error);
    next(error); 
  }
}

module.exports = chatbot;
