'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    nick: DataTypes.STRING,
    name: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    roleId: DataTypes.INTEGER
  }, {});
  User.associate = function (models) {
    User.belongsTo(models.role, {as: 'role'});
  };
  User.beforeCreate(user => {
    user.password = bcrypt.hashSync(user.password, 10);
  });
  User.beforeUpdate((user, options) => {
    if (options.fields.includes('password')) {
      user.password = bcrypt.hashSync(user.password, 10);
    }
  });
  return User;
};
