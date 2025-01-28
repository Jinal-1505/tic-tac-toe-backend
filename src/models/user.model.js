import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true, select: false },
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User;
