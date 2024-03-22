"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

exports. default = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      errors: ['Login Required'],
    });
  }
  // eslint-disable-next-line no-unused-vars
  const [bearer, token] = authorization.split(' ');
  try {
    const data = _jsonwebtoken2.default.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = data;
    const verifyUser = await _User2.default.findOne({
      where: { id, email },
    });
    if (!verifyUser) {
      return res.status(401).json({
        error: 'That user not exists !',
      });
    }
    req.userId = id; // I created
    req.userEmail = email;
    return next();
  } catch (e) {
    return res.status(401).json({
      errors: ['Token expired or invalid'],
    });
  }
};