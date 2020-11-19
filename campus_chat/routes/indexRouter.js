import sequelize from '../models';

const { Room, Chat } = sequelize;
const indexRouter = require('express').Router();

indexRouter.get('/', async (req, res) => {
  const rooms = await Room.findAll({});

  res.render('home', { rooms });
});

indexRouter.get('/room', (req, res) => {
  res.render('roomMake', {});
});

indexRouter.get('/room/:id', async (req, res) => {
  const { id } = req.params;
  const chat = await Chat.findOne({
    where: { id },
  });
  res.render('chat', { chat });
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
