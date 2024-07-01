const express=require("express");
const dotenv=require("dotenv");
const connection = require("./App/database/db");
const cors=require("cors");
const morgan=require("morgan");
const app=express();

dotenv.config(); 

// for retrieving the images from the database
app.use(express.static('uploads'));

app.use(express.json());
app.use(cors());
app.use(morgan('combined'));

// User Routes
const userRoutes = require("./App/Routes/User/index");
const chatbot=require("./chatbot")

// User Routes
app.use("/user", userRoutes);

app.post("/chatbot", chatbot);


 
const PORT=8080 || process.env.PORT
app.listen(`${PORT}`,()=>{
    console.log("server listening on port 8080");
})