import User from '../../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
    const {username, email, password} = req.body; //this is destructuring assignment in javascript it means we are extracting the values of username, email and password from req.body object

    try { 
        let user = await User.find({email}); //this is used to check if the user with the given email already exists in the database
        if (user){
            return res.status(400).json({message: 'User already exists'});
        }

        user = new User({username, email, password}); //this is used to create a new user object

        const salt = await bcrypt.genSalt(10); //this is used to generate a salt for hashing the password
        user.password = await bcrypt.hash(password, salt); //this is used to hash the password with the generated salt
        
        await user.save(); //this is used to save the user object to the database

        res.status(201).json({msg: 'User registered successfully'});
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

export const loginUser = async (req,res) => {
    const {email, password} = req.body; //this is destructuring assignment in javascript it means we are extracting the values of email and password from req.body object   
    try {
        const user = await User.findOne({email}).select ('+password'); //this is used to find the user with the given email in the database and also select the password field which is not selected by default
        if (!user){
            return res.status(400).json({message: 'Invalid Credentials'});
        }

        const isMatch = await bcrypt.compare(password, user.password); //this is used to compare the given password with the hashed password stored in the database
        if (!isMatch){ //here we are checking if the passwords do not match
            return res.status(400).json({message: 'Invalid Credentials'});
        }

        const payload = {
      user: {
        id: user.id, // Use the user's database ID
      },
    };

    // 4. Sign the token
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '5h' }, // Token expires in 5 hours
      (err, token) => {
        if (err) throw err;
        res.json({ token }); // Send the token to the client
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};