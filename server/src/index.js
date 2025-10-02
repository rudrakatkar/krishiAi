import mongoose from "mongoose";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import { DB_NAME } from "./constants.js";  

dotenv.config ({
    path: './env' //this is used because we have to configure import dotenv because we are not using it given by default from library
})




connectDB()
.then(() => { //here we used callback function because we want to start server only after DB is connected
    app.listen (process.env.PORT || 8000, ()=>{ 
        console.log(`Server is running at port ${process.env.PORT || 8000}`);
    })
})
.catch ((err)=>{
    console.log("Error in DB connection", err);
})
//this .then and .catch is used because connectDB is an async function which returns a promise so we have to use then and catch to handle the promise

//we can also use async await here but then we have to use IIFE (Immediately Invoked Function Expression) to call the async function immediately after defining it
//.then and .catch are java script promise methods to handle the promise returned by an async function