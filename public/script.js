// public/script.js

const socket = io();

// Referencias al DOM
const chatForm = document.getElementById('chat-form');
const messageInput = document.getElementById('message-input');
const messagesContainer = document.getElementById('messages');

// Escuchar el evento 'submit' del formulario para enviar un mensaje
chatForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevenir el envío de formulario por defecto
  const message = messageInput.value;

  // Emitir el mensaje al servidor
  socket.emit('chat message', message);

  // Limpiar el input
  messageInput.value = '';
  messageInput.focus();
});

// Escuchar los mensajes del servidor
socket.on('chat message', (msg) => {
  const messageElement = document.createElement('div');
  messageElement.textContent = msg;
  messagesContainer.appendChild(messageElement);
  messagesContainer.scrollTop = messagesContainer.scrollHeight; // Desplazar hacia abajo
});
