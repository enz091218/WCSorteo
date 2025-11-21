// World Cup Draw - Overlay Script
// This script handles the broadcast overlay display
// It receives real-time updates from the server via Socket.IO

const groupNames = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

// Connect to Socket.IO server
const socket = io();

// Listen for groups updates from server
// This is how the overlay updates when control.html makes changes
socket.on('groups_update', (data) => {
    console.log('Data updated from server');
    renderGroups(data);
});

// Render all groups to the page
function renderGroups(data) {
    const container = document.getElementById('groupsContainer');
    container.innerHTML = '';

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
