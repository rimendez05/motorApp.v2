const Repair = require('../models/repairs.model');
const User = require('../models/users.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validRepair = catchAsync(async (req, res, next) => {
  const {id} = req.params;

  const repair = await Repair.findOne({
    where: {
      id,
      status: ['pending'],
    },
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
    include: [
      {
        model: User,
        attributes: [ 'name', 'email', 'id' ],
      },
    ],
  });

  if (!repair) {
    return next(
      new AppError('Repair not found', 404)
      )
  };
  req.repair = repair;
  next();  
});