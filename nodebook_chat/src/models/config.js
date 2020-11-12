require('dotenv').config();

const env = process.env;

const config = {
  development: {
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_DATABASE,
    host: env.DB_HOST,
    timezone:'Etc/GMT0',
    dialect: 'mariadb',
    dialectOptions: {
      timezone:'Etc/GMT0',
    }
  },
  production: {
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_DATABASE,
    host: env.DB_HOST,
    timezone:'Etc/GMT0',
    dialect: 'mariadb',
    dialectOptions: {
      timezone:'Etc/GMT0',
    }
  }
};

  
export default config;