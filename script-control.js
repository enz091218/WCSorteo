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
        title.textContent = `Group ${groupName}`;
        groupPanel.appendChild(title);

        const teams = currentData[groupName] || ['', '', '', ''];
        
        for (let i = 0; i < 4; i++) {
            const inputGroup = document.createElement('div');
            inputGroup.className = 'input-group';

            const label = document.createElement('label');
            label.textContent = `Team ${i + 1}`;
            
            const input = document.createElement('input');
            input.type = 'text';
            input.id = `group-${groupName}-team-${i}`;
            input.placeholder = `Enter team ${i + 1} name`;
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
    
    showStatus('Changes saved successfully! Overlay updated.', 'success');
}

// Clear all group data
function clearAll() {
    if (confirm('Are you sure you want to clear all teams? This will reset the entire draw.')) {
        socket.emit('clear_groups');
        showStatus('All teams cleared successfully!', 'success');
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
