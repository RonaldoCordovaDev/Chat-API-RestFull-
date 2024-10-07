// public/script.js

const socket = io();
const chatForm = document.getElementById('chat-form');
const messageInput = document.getElementById('message-input');
const messagesContainer = document.getElementById('messages');

// Variable para identificar al usuario (ID único para cada pestaña)
const userID = Math.random().toString(36).substr(2, 9);

// Escuchar el evento 'submit' del formulario para enviar un mensaje
chatForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevenir el envío de formulario por defecto
  
  const message = messageInput.value;
  if (message.trim() === '') return; // Verificar si el mensaje está vacío

  // Crear el objeto del mensaje con ID del usuario
  const messageObject = {
    text: message,
    userID: userID
  };

  // Emitir el mensaje al servidor con el ID del usuario
  socket.emit('chat message', messageObject);

  // Añadir el mensaje al contenedor como 'sent' (opcional, eliminar para evitar duplicados)
 // addMessageToDOM(messageObject, 'sent');

  // Limpiar el input
  messageInput.value = '';
  messageInput.focus();
});

// Escuchar los mensajes del servidor y añadir al contenedor
socket.on('chat message', (msg) => {
  const messageClass = msg.userID === userID ? 'sent' : 'received'; // Diferenciar el mensaje
  addMessageToDOM(msg, messageClass);
});

// Función para agregar mensajes al DOM con clases dinámicas
function addMessageToDOM(message, messageClass) {
  const messageElement = document.createElement('div');
  messageElement.textContent = message.text;
  messageElement.classList.add('message', messageClass); // Asignar las clases
  messagesContainer.appendChild(messageElement);
  messagesContainer.scrollTop = messagesContainer.scrollHeight; // Desplazar hacia abajo
}
