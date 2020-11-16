// eslint-disable-next-line import/no-extraneous-dependencies
import Sequelize from 'sequelize';

require('dotenv').config();

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config').default[env];

const db = {};

const sequelize = new Sequelize(
  config.database,
  config.user,
  config.password,
  config,
  {
    host: config.host,
  },
);

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
