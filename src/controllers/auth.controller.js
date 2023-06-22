const User = require('../models/users.model');
const catchAsync = require('../utils/catchAsync');
const bcrypt = require('bcryptjs');
const generateJWT = require('../utils/jwt');
const AppError = require('../utils/appError');

exports.signup = catchAsync(async (req, res, next) => {
  const {name, email, password} = req.body;

  const salt = await bcrypt.genSaltSync(12);
  const encryptedPassword = await bcrypt.hashSync(password, salt);

  const user = await User.create({
    name: name.toLowerCase(),
    email: email.toLowerCase(),
    password: encryptedPassword,
  });

  const token = await generateJWT(user.id);

  res.status(201).json({
    status: 'success',
    message: 'User created successfully',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const {email, password} = req.body;

  const user = await User.findOne({
    where: {
      email: email.toLowerCase(),
      status: 'active',
    },
  });

  if (!user) {
    return next(new AppError('Invalid email or password', 404));
  } 

  if (!bcrypt.compareSync(password, user.password)) {
    return next(new AppError('Invalid email or password', 401));
  }

  const token = await generateJWT(user.id);

  res.status(200).json({
    status: 'success',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  }); 
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const {user} =  req;
  const {currentPassword, newPassword} = req.body;

  if (!(await bcrypt.compareSync(currentPassword, user.password))) {
    return next(new AppError('Invalid password', 401));
  }

  const salt = await bcrypt.genSaltSync(12);
  const encryptedPassword = await bcrypt.hash(newPassword, salt);

  await user.update({
    password: encryptedPassword,
    passwordchangedat: Date.now(),
  });

  return res.status(200).json({
    status: 'success',
    message: 'Password updated successfully',
  });
});

exports.renew = catchAsync(async (req, res, next) => {
  const { id } = req.sessionUser;

  const user = await User.findOne({
    where: {
      id,
      status: 'active',
    },
  });

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  const token = await generateJWT(id);

  return res.status(200).json({
    status: 'success',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      description: user.description,
      profileImgUrl: user.profileImgUrl,
      role: user.role,
    },
  });
});