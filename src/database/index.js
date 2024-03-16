/* eslint-disable import/no-unresolved */
import Sequelize from 'sequelize';
// import databaseConfig from '../config/database';
import Student from '../models/Student';
import User from '../models/User';
import Picture from '../models/Picture';
import databaseConfig from '../config/database';

require('dotenv').config();

const allModels = [Student, User, Picture];
const connection = new Sequelize(databaseConfig);

allModels.forEach((model) => model.init(connection)); // initialization of all models
allModels.forEach((model) => model.associate && model.associate(connection.models));
