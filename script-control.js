// World Cup Draw - Control Panel Script
// This script handles the control panel where teams are entered
// It writes to localStorage which automatically updates the overlay

const STORAGE_KEY = 'worldCupGroups';
const groupNames = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

// Data structure for groups:
// {
//   "A": ["Team1", "Team2", "Team3", "Team4"],
//   "B": ["", "", "", ""],
//   ...
// }

// Initialize the data structure if it doesn't exist
function initializeData() {
    const existingData = localStorage.getItem(STORAGE_KEY);
    if (!existingData) {
        const initialData = {};
        groupNames.forEach(group => {
            initialData[group] = ['', '', '', ''];
        });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
    }
}

// Create the input forms for all groups
function createGroupForms() {
    const container = document.getElementById('groupsGrid');
    container.innerHTML = '';

    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');

    groupNames.forEach(groupName => {
        const groupPanel = document.createElement('div');
        groupPanel.className = 'group-panel';

        const title = document.createElement('h3');
        title.textContent = `Group ${groupName}`;
        groupPanel.appendChild(title);

        const teams = data[groupName] || ['', '', '', ''];
        
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

// Save all changes to localStorage
// This triggers the 'storage' event in overlay.html, causing automatic update
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

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    
    showStatus('Changes saved successfully! Overlay updated.', 'success');
}

// Clear all group data
function clearAll() {
    if (confirm('Are you sure you want to clear all teams? This will reset the entire draw.')) {
        const emptyData = {};
        groupNames.forEach(group => {
            emptyData[group] = ['', '', '', ''];
        });
        
        localStorage.setItem(STORAGE_KEY, JSON.stringify(emptyData));
        
        createGroupForms();
        
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

// Initialize on page load
initializeData();
createGroupForms();
