console.log('chat.js loaded');

// eslint-disable-next-line no-undef
const socket = io.connect('http://localhost:8001/chat');

socket.emit('connection');

socket.on('join', data => {
  console.log('join event ouccred!');
  const chatContainer = document.querySelector('.chat-container');
  const sysJoinDiv = document.createElement('div');
  sysJoinDiv.textContent = `${data.userId}님이 입장하셨습니다.`;
  sysJoinDiv.classList.add('system');
  chatContainer.appendChild(sysJoinDiv);
});
