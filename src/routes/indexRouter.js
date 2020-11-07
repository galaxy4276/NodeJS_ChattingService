import sequelize from '../models';
const { Chat, Room } = sequelize;

const indexRouter = require('express').Router();

indexRouter.post('/:id/chat', async (req, res, next) => { 
  try {
    const chat = await Chat.create({
      room: req.params.id,
      user: req.session.color,
      chat: req.body.chat,
      RoomId: req.params.id,
    });
    console.log(chat.dataValues);
    req.app.get('io').of('/chat').to(req.params.id).emit('chat', chat);
    res.send('ok');
  } catch (err) {
    console.error(err);
    next(err);
  }
});

indexRouter.get('/', async (req, res, next) => {
  try {
    const rooms = await Room.findAll({});
    res.render('main', { rooms, title: 'GIF 채팅방', error: req.flash('roomError') });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

indexRouter.get('/room/:id', async (req, res, next) => {
  try {
    const room = await Room.findOne({ where: { id: req.params.id }});
    const io = req.app.get('io');
    if (!room) {
      req.flash('roomError', '존재하지 않는 방입니다.');
      return res.redirect('/');
    }
    
    if (room.password && room.password !== req.query.password) {
      req.flash('roomError', '비밀번호가 틀렸습니다.');
      return res.redirect('/');
    }
    
    const { rooms } = io.of('/chat').adapter;
    if (rooms && rooms[req.params.id] && room.max <= rooms[req.params.id].length) {
      req.flash('roomError', '허용 인원이 초과하였습니다.');
      return res.redirect('/');
    }
    
    const chats = await Chat.findAll({
      where: { RoomId: room.id },
      order: [
        ['createdAt', 'ASC']
      ],
    });
    
    return res.render('chat', {
      room,
      title: room.title,
      chats,
      user: req.session.color,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});


indexRouter.get('/room', async (req, res) => {
  res.render('room', { title: 'GIF 채팅방 생성' });
});


indexRouter.post('/room', async (req, res, next) => {
  try {
    const room = await Room.create({
      title: req.body.title,
      max: req.body.max,
      owner: req.session.color,
      password: req.body.password,
    });

    const io = req.app.get('io');
    io.of('/room').emit('newRoom', room);
    res.redirect('/');
    //res.redirect(`/room/${room.id}?password=${req.body.password}`);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

indexRouter.delete('/room/:id', async (req, res, next) => {
  try {
    const room = await Room.findOne({ where: { id: req.params.id }});
    await room.destroy();
    res.send('ok');
    setTimeout(() => {
      req.app.get('io').of('/room').emit('removeRoom', req.params.id);
    }, 2000);
  } catch (err) {
    console.error(err);
    next(err);
  }
});


export default indexRouter;