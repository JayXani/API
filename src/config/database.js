require('dotenv').config();

module.exports = {
  dialect: 'postgres',
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  database: process.env.DATABASE,
  password: process.env.DATABASE_PASSWORD,
  define: {
    timesTamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
