document.addEventListener('DOMContentLoaded', () => {
    // Cargar las salas disponibles
    fetch('php/getRooms.php')
        .then(response => response.json())
        .then(data => {
            const roomList = document.getElementById('roomList');
            roomList.innerHTML = '';

            data.rooms.forEach(room => {
                const roomDiv = document.createElement('div');
                roomDiv.classList.add('room-item');
                roomDiv.innerHTML = `
                    <h2>${room.room_name}</h2>
                    <p>Código: ${room.room_code}</p>
                    <p>Jugadores: ${room.players_number}</p>
                    <p>Precio por cartón: ${room.price_per_card} monedas</p>
                    <button onclick="joinRoom(${room.room_id})">Unirse a la sala</button>
                `;
                roomList.appendChild(roomDiv);
            });
        })
        .catch(error => console.error('Error:', error));

    // Añadir evento al botón para crear sala
    document.getElementById('createRoomButton').addEventListener('click', createRoom);
});

function createRoom() {
    const roomName = document.getElementById('roomName').value;
    const playersNumber = document.getElementById('playersNumber').value;
    const pricePerCard = document.getElementById('pricePerCard').value;
    const roomVisibility = document.getElementById('roomVisibility').value;

    fetch('php/createRoom.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            room_name: roomName,
            players_number: playersNumber,
            price_per_card: pricePerCard,
            room_visibility: roomVisibility
        })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        if (data.status === 'success') {
            // Redirigir a la sala de espera con el ID de la sala
            window.location.href = `salaEspera.html?room_id=${data.room_id}`;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error al crear la sala.');
    });
}

function joinRoom(roomId) {
    fetch('php/joinRoom.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            room_id: roomId,
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            // Redirigir a la sala de espera con el ID de la sala
            window.location.href = `salaEspera.html?room_id=${roomId}`;
        } else {
            alert(data.message); // Muestra el mensaje de error
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error al unirse a la sala.');
    });
}
