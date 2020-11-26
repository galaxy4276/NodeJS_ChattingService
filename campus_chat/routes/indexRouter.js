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

  req.app
    .get('io')
    .of('/chat')
    .to(req.params.id)
    .emit('join', { userId: req.session.color });
  console.log(`userId: ${req.session.color}`);
  res.render('chat', { chat, id });
});

indexRouter.post('/room/:id', async (req, res, next) => {
  const chat = await Chat.create({
    user: req.session.color,
    chat: req.body.chat,
  });
  const room = await Room.findOne({ where: { id: req.params.id } });
  await room.addChats(chat);

  req.app.get('io').of('/chat').to(req.params.id).emit('chat', chat);

  next();
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
