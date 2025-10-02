import express from 'express';
import connectDB from './config/db';
import cookieParser from 'cookie-parser';

const app = express() //app.use is used to use middleware in express
app.use(cors({
    origin: process.env.CORS_ORIGIN, // Replace with your frontend URL
    credentials: true, // Allow cookies to be sent
}))
//meaning of parse is to convert data from one format to another format for example from json to object or from object to json
app.use(express.json({limit: "16kb"})) //this is used to parse json data from request body
app.use(express.urlencoded({ extended: true, limit: "16kb"})) //this is used to parse urlencoded data from request body
app.use(express.static('public')) //this is used to serve static files from public folder
app.use(cookieParser()) //this is used to parse cookies from request headers

export {app}; 