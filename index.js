const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const axios = require('axios');
const { Chess } = require('chess.js');

const app = express();
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // We will narrow this to your Vercel URL later
    methods: ["GET", "POST"]
  }
});

// Test Route
app.get('/', (req, res) => {
  res.send('Chess Backend is Running!');
});

// Socket.io Logic
io.on('connection', (socket) => {
  console.log('A player connected:', socket.id);

  socket.on('join_game', (data) => {
    socket.join(data.room);
    console.log(`User joined room: ${data.room}`);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
