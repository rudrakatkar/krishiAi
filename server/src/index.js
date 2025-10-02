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