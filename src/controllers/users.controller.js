const User = require('../models/users.model');
const catchAsync = require('../utils/catchAsync');

exports.findAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll({

    where: {
    status: 'active',
  },   
  });
  
    res.status(200).json({
    status: 'success',
    results: users.length,
    users,
  });
});

exports.findUserById = catchAsync(async (req, res, next) => {
  const {user} = req;

    res.status(200).json({
    status: 'success',
    user,
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const {name} = req.body;
  const {user} = req;

    await user.update({name});

    res.status(200).json({
    status: 'success',
    message: 'User updated successfully',
    user,
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {

  const {user} =  req;

    await user.update({status: 'disabled'});

    res.status(200).json({
    status: 'success',
    message: 'User deleted successfully',
  });
});


