import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

/**
 * SignUp
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const signUp = async (req, res) => {
  try {
    const { userName, firstName, lastName, email, password } = req.body;
    const emailExist = await User.findOne({ email: email });
    if (emailExist) {
      return res.send({ statusCode: 400, message: 'EmailId  Already Exist' });
    }

    const newUser = {
      userName: userName,
      firstName: firstName,
      email: email,
      lastName: lastName,
      password: await bcrypt.hash(password, 10),
    };
    await User.create(newUser);

    res.status(200).json({
      message: 'User registered successfully',
      userDetails: { _id: newUser._id, email: newUser.email, userName: newUser.userName },
    });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

/**
 * SignIn
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const emailExist = await User.findOne({ email: email }).select('+password');
    if (!emailExist) {
      return res.send({ statusCode: 404, message: 'User Not Found' });
    }
    const user = await User.findOne({ email: req.body.email }).select('+password');

    const comparePassword = await bcrypt.compare(password, emailExist.password);
    if (!comparePassword) {
      return res.send({ statusCode: 401, message: 'Invalid Email or password' });
    }

    // Generate a JWT token with the user's ID and email
    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.TOKEN_EXPIRATION,
      }
    );

    res.status(200).json({
      message: 'User logged in successfully',
      user: { _id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email },
      token: token,
    });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
