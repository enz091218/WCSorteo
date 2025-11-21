const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 5000;

app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const groupsData = {
  A: ['', '', '', ''],
  B: ['', '', '', ''],
  C: ['', '', '', ''],
  D: ['', '', '', ''],
  E: ['', '', '', ''],
  F: ['', '', '', ''],
  G: ['', '', '', ''],
  H: ['', '', '', ''],
  I: ['', '', '', ''],
  J: ['', '', '', ''],
  K: ['', '', '', ''],
  L: ['', '', '', ''],
  1: ['', '', '', ''],
  2: ['', '', '', ''],
  3: ['', '', '', ''],
  4: ['', '', '', ''],
  5: ['', '', '', ''],
  6: ['', '', '', ''],
  7: ['', '', '', ''],
  8: ['', '', '', ''],
  9: ['', '', '', ''],
  10: ['', '', '', ''],
  11: ['', '', '', ''],
  12: ['', '', '', '']
};

const letterToNumber = { A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9, J: 10, K: 11, L: 12 };
const numberToLetter = { 1: 'A', 2: 'B', 3: 'C', 4: 'D', 5: 'E', 6: 'F', 7: 'G', 8: 'H', 9: 'I', 10: 'J', 11: 'K', 12: 'L' };

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.emit('groups_update', groupsData);

  socket.on('update_groups', (data) => {
    console.log('Groups updated from control panel');
    Object.keys(data).forEach(key => {
      groupsData[key] = [...data[key]];
      
      if (letterToNumber[key]) {
        groupsData[letterToNumber[key]] = [...data[key]];
      } else if (numberToLetter[key]) {
        groupsData[numberToLetter[key]] = [...data[key]];
      }
    });
    io.emit('groups_update', groupsData);
  });

  socket.on('clear_groups', () => {
    console.log('Groups cleared');
    Object.keys(groupsData).forEach(key => {
      groupsData[key] = ['', '', '', ''];
    });
    io.emit('groups_update', groupsData);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`World Cup Draw server running on port ${PORT}`);
});
