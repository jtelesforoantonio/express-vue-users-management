const {check} = require('express-validator');

exports.userStore = [
  check('nick').exists().matches(/^[_?A-Za-z][A-Za-z0-9]+$/i),
  check('name').exists(),
  check('email').isEmail(),
  check('password').exists(),
  check('roleId').exists().isIn([1, 2, 3]),
];

exports.userUpdate = [
  check('nick').exists().matches(/^[_?A-Za-z][A-Za-z0-9]+$/i),
  check('name').exists(),
  check('email').isEmail(),
  check('roleId').exists().isIn([1, 2, 3]),
];
