require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json());
app.use(cors());

console.log('MONGO_URI:', process.env.MONGO_URI);

const mongoUri =
  process.env.MONGO_URI ||
  'mongodb+srv://rossjaden44:Kevin1234@cluster0.fmpf1.mongodb.net/chatApp?retryWrites=true&w=majority';

mongoose
  .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1); 
  });

app.use('/auth', require('./routes/authRoutes'));
app.use('/chat', require('./routes/chatRoutes'));

io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('joinRoom', ({ room }) => socket.join(room));
  socket.on('message', ({ room, message }) => io.to(room).emit('message', message));
  socket.on('disconnect', () => console.log('User disconnected'));
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
