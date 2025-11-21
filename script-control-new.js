const socket = io();

const groupNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

let currentData = {};

socket.on('groups_update', (data) => {
    console.log('Received groups data from server');
    currentData = data;
    createGroupPanels();
});

function createGroupPanels() {
    const container = document.getElementById('groupsContainer');
    container.innerHTML = '';

    groupNumbers.forEach(groupNum => {
        const panel = document.createElement('div');
        panel.className = 'group-panel';

        const header = document.createElement('div');
        header.className = 'group-header';
        header.textContent = `Grupo ${groupNum}`;
        panel.appendChild(header);

        const body = document.createElement('div');
        body.className = 'group-body';

        const teams = currentData[groupNum] || ['', '', '', ''];
        
        for (let i = 0; i < 4; i++) {
            const row = document.createElement('div');
            row.className = 'team-row';

            const flag = document.createElement('div');
            flag.className = 'flag-placeholder';
            row.appendChild(flag);

            const inputGroup = document.createElement('div');
            inputGroup.className = 'team-input-group';

            const label = document.createElement('div');
            label.className = 'team-label';
            label.textContent = `G${groupNum} Pais ${i + 1}`;
            inputGroup.appendChild(label);

            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'team-input';
            input.id = `group-${groupNum}-team-${i}`;
            input.placeholder = `Ingrese nombre del país`;
            input.value = teams[i] || '';
            inputGroup.appendChild(input);

            row.appendChild(inputGroup);
            body.appendChild(row);
        }

        panel.appendChild(body);
        container.appendChild(panel);
    });
}

function saveChanges() {
    const data = {};

    groupNumbers.forEach(groupNum => {
        const teams = [];
        for (let i = 0; i < 4; i++) {
            const input = document.getElementById(`group-${groupNum}-team-${i}`);
            teams.push(input.value.trim());
        }
        data[groupNum] = teams;
    });

    socket.emit('update_groups', data);
    showStatus('¡Cambios guardados exitosamente!', 'success');
}

function clearAll() {
    if (confirm('¿Está seguro que desea limpiar todos los equipos?')) {
        socket.emit('clear_groups');
        showStatus('¡Todos los equipos han sido eliminados!', 'success');
    }
}

function showStatus(message, type) {
    const statusEl = document.getElementById('statusMessage');
    statusEl.textContent = message;
    statusEl.className = `status-message ${type} show`;
    
    setTimeout(() => {
        statusEl.className = 'status-message';
    }, 3000);
}
