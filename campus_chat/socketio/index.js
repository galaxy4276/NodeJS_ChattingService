import socketIO from 'socket.io';

const serverSocket = (server, app) => {
  const io = socketIO(server);
  app.set('io', io);
  io.on('connection', () => {
    console.log('새 유저가 입장하였어요~');
  });
};

export default serverSocket;
