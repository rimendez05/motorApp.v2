const {db} = require('../database/config');
const Repair = require('../models/repairs.model');
const User = require('../models/users.model');
const catchAsync = require('../utils/catchAsync');

exports.findAllRepairs = catchAsync(async (req, res, next) => {
  const  repairs = await Repair.findAll({
    where: {
      status: ['pending','in process', 'finished'],
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
    order:[['createdAt', 'DESC']],
    limit: 10,
  });
  return res.json({
    status: 'success',
    results: repairs.length,
    repairs,
  });
});

  exports.findRepair = catchAsync(async (req, res, next) => {
    const {repair} = req;

    return res.json({
      status: 'success',
      repair,
    });
  });

exports.findMyRepairs = catchAsync(async (req, res, next) => {
  const {sessionUser} = req;

  const query = `SELECT * FROM repairs WHERE userId = ${sessionUser.id} AND status IN ('pending', 'in process', 'finished') ORDER BY createdAt DESC LIMIT 10;`;

  const [rows, fields] = await db.query(query, {
    replacements: {
      induser: sessionUser.id,
      status: ['pending', 'in process', 'finished'],
    },
  });

  return res.status(200).json({
    status: 'success',
    results: fields.rowCount,
    post: rows,
  });  
});

exports.findPendingRepairs = catchAsync(async (req, res, next) => {
const {id} = req.params;

const repairs = await Repair.findAll({
  where: {
    userId: id,
    status: ['pending'],
  },
  include: [
    {
      model: User,
      attributes: {exclude: ['password', 'passwordChangedAt']},
    },
  ],
});

return res.status(200).json({
  status: 'success',
  results: repairs.length,
  repairs,
  });
});

exports.createRepair = catchAsync(async (req, res, next) => {
  const {date, status} = req.body;
  const {id} = req.sessionUser;

  const repair = await Repair.create({
    date,
    status,
    userId: id,
  });

  return res.json({
    status: 'success',
    repair,
  });
});

exports.updateRepair = catchAsync(async (req, res, next) => {
  const {repair} = req;
  const {date, description} = req.body;

  const repairUpdated = await repair.update({date, description, status:'in process'  || 'finished'});

  return res.json({
    status: 'success',
    repair: repairUpdated,
  });
});

exports.deleteRepair = catchAsync(async (req, res, next) => {
  const {repair} = req;

  await repair.update({status: 'cancelled'});

  return res.status(200).json({
    status: 'success',
    message: 'Repair finished',
  });  
});