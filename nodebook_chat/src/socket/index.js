import SocketIO from 'socket.io';
import axios from 'axios';


export default (server, app, sessionMiddlewares) => {
  const io = SocketIO(server, { path: '/socket.io' });

  app.set('io', io);

  const room = io.of('room'); // namespace를 부여하는 메서드
  const chat = io.of('chat');
  io.use((socket, next) => { // use로 미들웨어 장착 가능, 웹 소켓 연결마다 수행
    sessionMiddlewares(socket.request, socket.request.res, next);// 요청, 응답, next
  });

  room.on('connection', (socket) => {
    console.log('room 네임스페이스 접속');
    socket.on('disconnect', () => {
      console.log('room 네임스페이스 접속 해제');
    });
  });

  chat.on('connection', (socket) => {
    console.log('chat 네임스페이스 접속');
    const req = socket.request;
    const { headers: { referer } } = req; // 현재 웹페이지의 referer
    const roomId = referer
      .split('/')[referer.split('/').length - 1]
      .replace(/\?.+/, '');
    socket.join(roomId);
    socket.to(roomId).emit('join', { // to로 특정방에 데이터를 보낼 수 있다.
      user: 'system',
      chat: `${req.session.color}님이 입장하셨습니다.`,
    });
    chat.on('disconnect', () => {
      console.log('chat 네임스페이스 접속 해제');
      socket.leave(roomId);
      const currentRoom = socket.adapter.rooms[roomId];
      const userCount = currentRoom ? currentRoom.length : 0;
      if (userCount === 0) {
        axios.delete(`http://localhost:8001/room/${roomId}`)
          .then(() => console.log('방 제거 요청 성공'))
          .catch((err) => console.error(err));
      } else {
        socket.to(roomId).emit('exit', {
          user: 'system',
          chat: `${req.session.color}님이 퇴장하셨습니다.`,
        })
      }
    });
  });
};