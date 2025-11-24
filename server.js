const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const fs = require('fs').promises;

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 5000;
const TRANSFORMS_FILE = path.join(__dirname, 'transforms.json');
const CONFIG_FILE = path.join(__dirname, 'config-overlay3.json');

app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.put('/config-overlay3.json', async (req, res) => {
  try {
    await fs.writeFile(CONFIG_FILE, JSON.stringify(req.body, null, 2));
    console.log('Config saved successfully');
    res.json({ success: true, message: 'Configuración guardada correctamente' });
  } catch (error) {
    console.error('Error saving config:', error);
    res.status(500).json({ success: false, error: error.message });
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

let transformsData = {
  groups: {},
  bombos: {}
};

let currentBombo = 1;
let highlightedCountry = -1; // -1 = ninguno, 0-11 = índice del país en el bombo
let highlightedGroup = ''; // '' = ninguno, 'A'-'L' = grupo destacado

// Cargar transformaciones desde archivo
async function loadTransforms() {
  try {
    const data = await fs.readFile(TRANSFORMS_FILE, 'utf8');
    transformsData = JSON.parse(data);
    console.log('Transforms loaded from file');
  } catch (error) {
    console.log('No transforms file found, using defaults');
    // Inicializar con valores por defecto
    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'].forEach(letter => {
      transformsData.groups[letter] = { x: 0, y: 0, scaleX: 1, scaleY: 1 };
    });
    [1, 2, 3, 4].forEach(num => {
      transformsData.bombos[num] = { x: 0, y: 0, scaleX: 1, scaleY: 1 };
    });
    await saveTransforms();
  }
}

// Guardar transformaciones en archivo
async function saveTransforms() {
  try {
    await fs.writeFile(TRANSFORMS_FILE, JSON.stringify(transformsData, null, 2));
    console.log('Transforms saved to file');
  } catch (error) {
    console.error('Error saving transforms:', error);
  }
}

// Cargar transformaciones al iniciar
loadTransforms();

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.emit('groups_update', groupsData);
  socket.emit('bombo_update', currentBombo);
  socket.emit('highlighted_country_update', highlightedCountry);
  socket.emit('highlighted_group_update', highlightedGroup);
  socket.emit('transforms_update', transformsData);

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
    socket.emit('transforms_update', transformsData);
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

  socket.on('update_transform', async (data) => {
    const { type, id, transform } = data;
    console.log(`Transform updated for ${type} ${id}:`, transform);
    
    if (type === 'group' && transformsData.groups[id]) {
      transformsData.groups[id] = transform;
    } else if (type === 'bombo' && transformsData.bombos[id]) {
      transformsData.bombos[id] = transform;
    }
    
    // Guardar en archivo
    await saveTransforms();
    
    // Emitir a todos los clientes
    io.emit('transforms_update', transformsData);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`World Cup Draw server running on port ${PORT}`);
});
