// server.js

const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIO(server); // Inicializa el socket en el servidor

// Middleware para servir la carpeta 'public' donde estará el frontend
app.use(express.static(path.join(__dirname, 'public')));
// Socket.io para gestionar la comunicación en tiempo real
io.on('connection', (socket) => {
  console.log('Nuevo usuarioo conectado');

  // Escuchar mensajes desde el cliente
  socket.on('chat message', (msg) => {
   // console.log(`Mensaje recibido: ${msg}`);
    io.emit('chat message', msg); // Emitir el mensaje a todos los usuarios conectados
  });

  // Desconexión del usuario
  socket.on('disconnect', () => {
    console.log('Usuario desconectado');
  });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
