"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }/* eslint-disable import/no-unresolved */
var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
// import databaseConfig from '../config/database';
var _Student = require('../models/Student'); var _Student2 = _interopRequireDefault(_Student);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _Picture = require('../models/Picture'); var _Picture2 = _interopRequireDefault(_Picture);
var _database = require('../config/database'); var _database2 = _interopRequireDefault(_database);

require('dotenv').config();

const allModels = [_Student2.default, _User2.default, _Picture2.default];
const connection = new (0, _sequelize2.default)(_database2.default);

allModels.forEach((model) => model.init(connection)); // initialization of all models
allModels.forEach((model) => model.associate && model.associate(connection.models));
