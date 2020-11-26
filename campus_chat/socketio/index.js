import socketIO from 'socket.io';

const serverSocket = (server, app, sessionMiddleware) => {
  const io = socketIO(server);
  app.set('io', io);

  // const room = io.of('room');
  const chat = io.of('chat');
  io.use((socket, next) => {
    sessionMiddleware(socket.request, socket.request.res, next);
  });

  chat.on('connection', socket => {
    console.log('client join the chat');
    const {
      headers: { referer },
    } = socket.request;
    const roomId = referer.split('/')[referer.split('/').length - 1];
    socket.join(roomId);

    chat.to(roomId).emit('join', { userId:  });
  });
};

export default serverSocket;
