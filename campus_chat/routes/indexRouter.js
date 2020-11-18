import sequelize from '../models';

const { Room } = sequelize;
const indexRouter = require('express').Router();

indexRouter.get('/', async (req, res) => {
  const rooms = await Room.findAll({});

  res.render('home', { rooms });
});

indexRouter.get('/room', (req, res) => {
  res.render('roomMake', {});
});

indexRouter.post('/room', async (req, res) => {
  const { title, member, password } = req.body;

  await Room.create({
    title,
    count: member,
    password: password || null,
  });

  res.redirect('/');
});

export default indexRouter;
