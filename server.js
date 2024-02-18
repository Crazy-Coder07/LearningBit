const express=require("express");
const dotenv=require("dotenv");
const connection = require("./App/database/db");
const cors=require("cors");
const morgan=require("morgan");
const app=express();

dotenv.config(); 



app.use(express.json());
app.use(cors());
app.use(morgan('combined'));

// User Routes
const userRoutes = require("./App/Routes/User/index");

// User
app.use("/user", userRoutes);
 
const PORT=8080 || process.env.PORT
app.listen(`${PORT}`,()=>{
    console.log("server listening on port 8080");
})