const Repair = require('../models/repairs.model');
const User = require('../models/users.model');

const initModels = () => {
  User.hasMany(Repair, {foreignKey: 'userId'});
  Repair.belongsTo(User, {foreignKey: 'userId'});
};

module.exports = initModels;