import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';

const connectDB = async () => { // Removed the MONGODB_URI parameter as it's not being used
  try {
    // 1. Capture the connection object in a variable
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`); // 2. Fixed template string syntax
    
    console.log("DB connected successfully");
    console.log(`DB HOST IS: ${connectionInstance.connection.host}`);
  } catch (error) { // 3. Added the (error) parameter
    console.log("Error in DB connection", error);
    process.exit(1);
  }
};

export default connectDB;