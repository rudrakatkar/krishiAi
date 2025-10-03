import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String, 
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address']
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    select: false // Do not return password field by default, for security reasons
  }
}, { // The options object, including timestamps, should be the second argument
  timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;

