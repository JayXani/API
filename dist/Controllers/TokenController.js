"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// eslint-disable-next-line import/no-extraneous-dependencies
/* eslint-disable import/no-unresolved */
/* eslint-disable class-methods-use-this */
var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class TokenController {
  async store(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(401).json({
          error: ['Credentials invalid !'],
        });
      }
      const user = await _User2.default.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({
          error: ["User was't found !"],
        });
      }
      if (!(await user.passwordIsValid(password))) {
        return res.status(401).json({
          error: ['Password invalid !'],
        });
      }
      const { id } = user;
      const token = _jsonwebtoken2.default.sign({ id, email }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRE,
      });
      return res.json({ token, user: { name: user.name, id, email } });
    } catch (e) {
      return res.json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}
exports. default = new TokenController();
