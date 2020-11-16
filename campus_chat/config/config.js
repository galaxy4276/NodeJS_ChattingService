require('dotenv').config();

const { env } = process;

export default {
  development: {
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB,
    host: env.DB_HOST,
    dialect: 'mariadb',
  },
};
