import Sequelize from 'sequelize';
import path from 'path';
import config from './config';
import Chat from './Chat';
import Room from './Room';

const db = {};

const dbConfig = process.env.NODE_ENV === 'development' 
  ? config.development 
  : config.production;


export const sequelize = new Sequelize(dbConfig.database, dbConfig.username,
  dbConfig.password, {
    host: dbConfig.host,
    dialect: 'mariadb',
  });

db.Chat = Chat;
db.Room = Room;

Object.keys(db).forEach(modelName => {
  db[modelName] = db[modelName].init(sequelize);
})

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;


export default db;