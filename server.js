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

const crypto = require('crypto');
const validTokens = new Set();

app.post('/verify-password', (req, res) => {
  const { password } = req.body;
  const correctPassword = process.env.CONTROL_PANEL_PASSWORD || '3dblencad';
  
  if (password === correctPassword) {
    const token = crypto.randomBytes(32).toString('hex');
    validTokens.add(token);
    
    setTimeout(() => {
      validTokens.delete(token);
    }, 24 * 60 * 60 * 1000);
    
    res.json({ success: true, token });
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
  
  let authenticated = false;

  socket.emit('groups_update', groupsData);
  socket.emit('bombo_update', currentBombo);
  socket.emit('highlighted_country_update', highlightedCountry);
  socket.emit('highlighted_group_update', highlightedGroup);

  socket.on('authenticate', (token) => {
    if (validTokens.has(token)) {
      authenticated = true;
      console.log('Client authenticated for control:', socket.id);
      socket.emit('authenticated', true);
    } else {
      console.log('Invalid authentication token from:', socket.id);
      socket.emit('authenticated', false);
      socket.disconnect(true);
    }
  });

  socket.on('update_groups', (data) => {
    if (!authenticated) return;
    console.log('Groups updated from control panel');
    Object.assign(groupsData, data);
    io.emit('groups_update', groupsData);
  });

  socket.on('set_bombo', (bomboNumber) => {
    if (!authenticated) return;
    console.log('Bombo set to:', bomboNumber);
    currentBombo = bomboNumber;
    io.emit('bombo_update', currentBombo);
  });

  socket.on('set_highlighted_country', (countryIndex) => {
    if (!authenticated) return;
    console.log('Highlighted country set to:', countryIndex);
    highlightedCountry = countryIndex;
    io.emit('highlighted_country_update', highlightedCountry);
  });

  socket.on('set_highlighted_group', (groupLetter) => {
    if (!authenticated) return;
    console.log('Highlighted group set to:', groupLetter);
    highlightedGroup = groupLetter;
    io.emit('highlighted_group_update', highlightedGroup);
  });

  socket.on('request_current_state', () => {
    if (!authenticated) return;
    console.log('Client requested current state');
    socket.emit('groups_update', groupsData);
    socket.emit('bombo_update', currentBombo);
    socket.emit('highlighted_country_update', highlightedCountry);
    socket.emit('highlighted_group_update', highlightedGroup);
  });

  socket.on('clear_groups', () => {
    if (!authenticated) return;
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
