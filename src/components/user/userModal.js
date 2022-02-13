import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false,
  },
  mobileno: {
    type: String,
    required: true,
  },
  countryCode: {
    type: String,
    required: true,
  },
  photo: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.pre('save', async function (next) {
  // Hashing the password
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.pre(/^find/, function (next) {
  this.find({
    select: '-username',
  });
  next();
});

const User = mongoose.model('User', userSchema);

export default User;
