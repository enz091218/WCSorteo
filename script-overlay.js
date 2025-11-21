// World Cup Draw - Overlay Script
// This script handles the broadcast overlay display
// It reads from localStorage and updates automatically when data changes

const STORAGE_KEY = 'worldCupGroups';
const groupNames = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

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

// Render all groups to the page
function renderGroups() {
    const container = document.getElementById('groupsContainer');
    container.innerHTML = '';

    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');

    groupNames.forEach(groupName => {
        const groupCard = document.createElement('div');
        groupCard.className = 'group-card';

        const groupTitle = document.createElement('div');
        groupTitle.className = 'group-title';
        groupTitle.textContent = `Group ${groupName}`;

        const teamList = document.createElement('ul');
        teamList.className = 'team-list';

        const teams = data[groupName] || ['', '', '', ''];
        teams.forEach(team => {
            const teamItem = document.createElement('li');
            teamItem.className = 'team-item';
            
            if (team.trim() === '') {
                teamItem.textContent = '(empty)';
                teamItem.classList.add('empty');
            } else {
                teamItem.textContent = team;
            }
            
            teamList.appendChild(teamItem);
        });

        groupCard.appendChild(groupTitle);
        groupCard.appendChild(teamList);
        container.appendChild(groupCard);
    });
}

// Listen for storage changes from other tabs/windows
// This is how the overlay updates when control.html makes changes
window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEY) {
        console.log('Data updated from control panel');
        renderGroups();
    }
});

// Initialize and render on page load
initializeData();
renderGroups();
