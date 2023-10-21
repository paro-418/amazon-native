/* eslint-disable prettier/prettier */
const express = require('express');
const nodemailer = require('nodemailer');
const User = require('../models/user');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const router = express.Router();

// FUNCTIONS
const generateSecretKey = () => crypto.randomBytes(32).toString('hex');

const secretKey = generateSecretKey();

const sendVerificationEmail = async (email, verificationToken) => {
  // create a nodemailer transport
  const transporter = nodemailer.createTransport({
    // configure the email service
    service: 'gmail',
    auth: {
      user: 'foruselessthing69@gmail.com',
      pass: 'zwghcysxapqidtxf',
    },
  });
  // compose  the email
  const mailOptions = {
    from: 'foruselessthing69@gmail.com',
    to: email,
    subject: 'Email Verification',
    text: `Please click the following link to verify your email http://localhost:8000/auth/verify/${verificationToken}`,
  };

  // send the email
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log('error sending verification email', error);
  }
};

// ENDPOINTS

// user registration
router.post('/register', async (req, res) => {
  try {
    const {name, email, password} = req.body;
    console.log('backend', name, email, password);

    // check if email already registered
    const existingUser = await User.findOne({email});
    if (existingUser) {
      return res.status(400).json({
        message: 'Email already registered',
      });
    }

    // create a new user
    const newUser = await User.create({
      name,
      email,
      password,
    });

    // generate the access token

    newUser.verificationToken = crypto.randomBytes(20).toString('hex');

    // save the user
    await newUser.save();

    // send verification email to user

    await sendVerificationEmail(newUser.email, newUser.verificationToken);
    const token = jwt.sign({userId: newUser._id}, secretKey);
    return res.status(200).json({
      message: 'registration successful',
      token,
    });
  } catch (error) {
    console.log('error registering user', error);
    res.status(500).json({
      message: 'Registration failed',
    });
  }
});

// endpoint o verify the email

router.get('/verify/:token', async function (req, res) {
  try {
    const {token} = req.params;
    console.log('received token', token);
    // find use with given verification token
    const user = await User.findOne({verificationToken: token});

    if (!user) {
      return res.status(404).json({
        message: 'Invalid verification token',
      });
    }

    // Mark the user as verified
    user.verified = true;
    user.verificationToken = undefined;
    await user.save();

    return res.status(200).json({
      message: 'Email verified successfully',
    });
  } catch (error) {
    // console.log('');
    res.status(500).json({
      message: 'Email Verification failed',
    });
  }
});

// LOGIN

router.post('/login', async function (req, res) {
  try {
    const {email, password} = req.body;
    console.log('login credentials received', email, password);
    // check if user exist

    const user = await User.findOne({email});
    if (!user) {
      return res.status(401).json({
        message: 'Invalid email or password',
      });
    }

    // check if password is correct

    if (user.password !== password) {
      return res.status(401).json({
        message: 'Invalid email or password',
      });
    }

    // generate a token

    const token = jwt.sign({userId: user._id}, secretKey);

    return res.status(200).json({token});
  } catch (error) {
    console.log('login error', error);
    return res.status(500).json({
      message: 'Login failed',
    });
  }
});

module.exports = router;
