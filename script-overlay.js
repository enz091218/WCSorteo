// World Cup Draw - Overlay Script
// Este script maneja la pantalla del overlay
// Recibe updates en tiempo real desde el servidor vía Socket.IO

const groupNames = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

// Conexión con el servidor Socket.IO
const socket = io();

// Guardamos el último estado de grupos por si lo necesitamos
let lastGroupsData = {};

// === 1) Actualizar grupos normalmente ===
socket.on('groups_update', (data) => {
    console.log('groups_update recibido en overlay');
    lastGroupsData = data || {};
    renderGroups(lastGroupsData);
});

// === 2) NUEVO: escuchar el viaje de un equipo desde el bombo ===
socket.on('team_transfer', (data) => {
    console.log('team_transfer recibido en overlay:', data);
    // data = { teamName, fromBombo, fromIndex, toGroup, toSlot }
    animateTeamTransfer(data);
});

// === Render de todos los grupos ===
function renderGroups(data) {
    const container = document.getElementById('groupsContainer');
    container.innerHTML = '';

    groupNames.forEach(groupName => {
        const groupCard = document.createElement('div');
        groupCard.className = 'group-card';

        const groupTitle = document.createElement('div');
        groupTitle.className = 'group-title';
        groupTitle.textContent = `Grupo ${groupName}`;

        const teamList = document.createElement('ul');
        teamList.className = 'team-list';

        const teams = (data && data[groupName]) || ['', '', '', ''];

        teams.forEach(team => {
            const teamItem = document.createElement('li');
            teamItem.className = 'team-item';

            if (!team || team.trim() === '') {
                teamItem.textContent = '(vacío)';
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

// === 3) Animación simple cuando llega un equipo a un grupo ===
// Usa el toGroup (A..L) y toSlot (0..3) que manda el panel
function animateTeamTransfer({ teamName, toGroup, toSlot }) {
    const container = document.getElementById('groupsContainer');
    if (!container) return;

    // Buscar la card del grupo destino
    const groupCards = container.querySelectorAll('.group-card');
    let targetCard = null;

    groupCards.forEach(card => {
        const title = card.querySelector('.group-title');
        if (!title) return;

        // Texto del título es "Grupo X"
        const text = title.textContent.trim().toUpperCase();
        if (text === `GRUPO ${toGroup}`) {
            targetCard = card;
        }
    });

    if (!targetCard) {
        console.warn('No se encontró el grupo destino en el overlay:', toGroup);
        return;
    }

    // Buscar el <li> del slot destino (0..3)
    const items = targetCard.querySelectorAll('.team-item');
    const targetItem = items[toSlot];
    if (!targetItem) {
        console.warn('No se encontró el slot destino en el overlay:', toGroup, toSlot);
        return;
    }

    // Forzar que el texto sea el nombre del equipo (por si el update llegó un pelín desfasado)
    if (teamName && teamName.trim() !== '') {
        targetItem.textContent = teamName;
        targetItem.classList.remove('empty');
    }

    // Agregar clase de animación
    targetItem.classList.add('incoming-team');

    // Quitar la animación después de un rato
    setTimeout(() => {
        targetItem.classList.remove('incoming-team');
    }, 1200);
}
