// World Cup Draw - Control Panel Script
// This script handles the control panel where teams are entered
// It sends updates to the server via Socket.IO which broadcasts to all overlays

const groupNames = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

// Data structure for groups:
// {
//   "A": ["Team1", "Team2", "Team3", "Team4"],
//   "B": ["", "", "", ""],
//   ...
// }

// Connect to Socket.IO server
const socket = io();

let currentData = {};

// Listen for initial data and updates from server
socket.on('groups_update', (data) => {
    console.log('Received groups data from server');
    currentData = data;
    createGroupForms();
});

// Create the input forms for all groups
function createGroupForms() {
    const container = document.getElementById('groupsGrid');
    container.innerHTML = '';

    groupNames.forEach(groupName => {
        const groupPanel = document.createElement('div');
        groupPanel.className = 'group-panel';

        const title = document.createElement('h3');
        title.textContent = `Grupo ${groupName}`;
        groupPanel.appendChild(title);

        const teams = currentData[groupName] || ['', '', '', ''];
        
        for (let i = 0; i < 4; i++) {
            const inputGroup = document.createElement('div');
            inputGroup.className = 'input-group';

            const label = document.createElement('label');
            label.textContent = `Equipo ${i + 1}`;
            
            const input = document.createElement('input');
            input.type = 'text';
            input.id = `group-${groupName}-team-${i}`;
            input.placeholder = `Ingrese nombre equipo ${i + 1}`;
            input.value = teams[i] || '';

            inputGroup.appendChild(label);
            inputGroup.appendChild(input);
            groupPanel.appendChild(inputGroup);
        }

        container.appendChild(groupPanel);
    });
}

// Save all changes and send to server via Socket.IO
// This broadcasts the updated groups to all connected overlay pages
function saveChanges() {
    const data = {};

    groupNames.forEach(groupName => {
        const teams = [];
        for (let i = 0; i < 4; i++) {
            const input = document.getElementById(`group-${groupName}-team-${i}`);
            teams.push(input.value.trim());
        }
        data[groupName] = teams;
    });

    socket.emit('update_groups', data);
    
    showStatus('¡Cambios guardados correctamente! Pantalla actualizada.', 'success');
}

// Clear all group data
function clearAll() {
    if (confirm('¿Está seguro de que desea limpiar todos los equipos? Esto reiniciará todo el sorteo.')) {
        socket.emit('clear_groups');
        showStatus('¡Todos los equipos borrados exitosamente!', 'success');
    }
}

// Show status message to user
function showStatus(message, type) {
    const statusEl = document.getElementById('statusMessage');
    statusEl.textContent = message;
    statusEl.className = `status-message ${type}`;
    
    setTimeout(() => {
        statusEl.className = 'status-message';
    }, 3000);
}
