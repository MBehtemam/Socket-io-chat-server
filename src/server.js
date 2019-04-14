const dotenv = require('dotenv').config();
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

io.on('connection', () => {
  console.log('user is connected');
});

module.exports = http;
