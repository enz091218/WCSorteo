const socket = io();

const groupNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

socket.on('groups_update', (data) => {
    console.log('Data updated from server');
    renderGroups(data);
});

function renderGroups(data) {
    const container = document.getElementById('groupsContainer');
    container.innerHTML = '';

    groupNumbers.forEach(groupNum => {
        const card = document.createElement('div');
        card.className = 'group-card';

        const title = document.createElement('div');
        title.className = 'group-title';
        title.textContent = `Group ${groupNum}`;
        card.appendChild(title);

        const list = document.createElement('ul');
        list.className = 'team-list';

        const teams = data[groupNum] || ['', '', '', ''];
        teams.forEach((team, index) => {
            const item = document.createElement('li');
            item.className = 'team-item';
            
            if (team && team.trim() !== '') {
                item.textContent = team;
            } else {
                item.textContent = '(empty)';
                item.classList.add('empty');
            }
            
            list.appendChild(item);
        });

        card.appendChild(list);
        container.appendChild(card);
    });
}
