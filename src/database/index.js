/* eslint-disable import/no-unresolved */
import Sequelize from 'sequelize';
// import databaseConfig from '../config/database';
import Student from '../models/Student';
import User from '../models/User';
import Picture from '../models/Picture';

require('dotenv').config();

const allModels = [Student, User, Picture];
const connection = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: 'postgres',
  },
);

allModels.forEach((model) => model.init(connection)); // initialization of all models
allModels.forEach((model) => model.associate && model.associate(connection.models));
