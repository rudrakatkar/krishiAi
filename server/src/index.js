import mongoose from "mongoose";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import { DB_NAME } from "./constants.js";  

dotenv.config ({
    path: './env' //this is used because we have to configure import dotenv because we are not using it given by default from library
})




connectDB()
