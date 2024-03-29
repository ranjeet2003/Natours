const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppEroor = require('./../utils/appError');

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  const token = signToken(newUser._id);

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser
    }
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and passowrd exist
  if (!email || !password) {
    return next(new AppEroor('Please provide Email and password!', 400));
  }
  // 2) Check if the user exist && password is correct
  const user = await User.findOne({ email }).select('+password');
  // const correct = ;

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppEroor('Incorrect email or password', 401));
  }

  // 3) If everything is ok, send token to client
  const token = signToken(user._id);

  res.status(200).json({
    status: 'success',
    token
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1)getting token and check of its's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  console.log(token);

  if (!token) {
    return next(
      new AppEroor('You are not logged in! Please login to get access', 401)
    );
  }
  // 2) verification of token

  // 3) Check if user still exists

  // 4) Check if user changed password after the token was issued

  next();
});
