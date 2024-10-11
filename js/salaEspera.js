document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const roomId = params.get('room_id');

    fetch(`php/getRoomDetails.php?room_id=${roomId}`)
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                document.getElementById('roomName').innerText = data.room.room_name;
                document.getElementById('roomCode').innerText = `Código: ${data.room.room_code}`;
                document.getElementById('hostName').innerText = `Anfitrión: ${data.room.room_host}`;
                displayConnectedUsers(data.connected_users);
            } else {
                alert(data.message);
                window.location.href = 'index.html'; // Redirigir si hay error
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al obtener los detalles de la sala.');
        });
});

function displayConnectedUsers(users) {
    const userList = document.getElementById('connectedUsers');
    userList.innerHTML = '<h3>Jugadores Conectados:</h3>';
    
    if (users.length === 0) {
        userList.innerHTML += '<p>No hay jugadores conectados.</p>';
    } else {
        users.forEach(user => {
            const userDiv = document.createElement('div');
            userDiv.innerText = user.player_name; // Nombre del jugador
            userList.appendChild(userDiv);
        });
    }
}

function leaveRoom() {
    const params = new URLSearchParams(window.location.search);
    const roomId = params.get('room_id');

    fetch('php/leaveRoom.php', {
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
            alert(data.message);
            window.location.href = 'inicio2.html'; // Redirigir a la página principal
        } else {
            alert(data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error al salir de la sala.');
    });
}
