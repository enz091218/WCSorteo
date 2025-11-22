const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 5000;

app.use(express.static(path.join(__dirname)));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/verify-password', (req, res) => {
  const { password } = req.body;
  const correctPassword = process.env.CONTROL_PANEL_PASSWORD || '3dblencad';
  
  if (password === correctPassword) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
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
  L: ['', '', '', '']
};

let currentBombo = 1;
let highlightedCountry = -1; // -1 = ninguno, 0-11 = índice del país en el bombo
let highlightedGroup = ''; // '' = ninguno, 'A'-'L' = grupo destacado

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.emit('groups_update', groupsData);
  socket.emit('bombo_update', currentBombo);
  socket.emit('highlighted_country_update', highlightedCountry);
  socket.emit('highlighted_group_update', highlightedGroup);

  socket.on('update_groups', (data) => {
    console.log('Groups updated from control panel');
    Object.assign(groupsData, data);
    io.emit('groups_update', groupsData);
  });

  socket.on('set_bombo', (bomboNumber) => {
    console.log('Bombo set to:', bomboNumber);
    currentBombo = bomboNumber;
    io.emit('bombo_update', currentBombo);
  });

  socket.on('set_highlighted_country', (countryIndex) => {
    console.log('Highlighted country set to:', countryIndex);
    highlightedCountry = countryIndex;
    io.emit('highlighted_country_update', highlightedCountry);
  });

  socket.on('set_highlighted_group', (groupLetter) => {
    console.log('Highlighted group set to:', groupLetter);
    highlightedGroup = groupLetter;
    io.emit('highlighted_group_update', highlightedGroup);
  });

  socket.on('request_current_state', () => {
    console.log('Client requested current state');
    socket.emit('groups_update', groupsData);
    socket.emit('bombo_update', currentBombo);
    socket.emit('highlighted_country_update', highlightedCountry);
    socket.emit('highlighted_group_update', highlightedGroup);
  });

  socket.on('clear_groups', () => {
    console.log('Groups cleared');
    Object.keys(groupsData).forEach(key => {
      groupsData[key] = ['', '', '', ''];
    });
    highlightedGroup = ''; // Reset highlighted group
    io.emit('groups_update', groupsData);
    io.emit('highlighted_group_update', highlightedGroup);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`World Cup Draw server running on port ${PORT}`);
});
