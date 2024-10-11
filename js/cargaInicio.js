const loadingBar = document.querySelector('.progress');
const loadingText = document.querySelector('.loading-text');
const loadingTip = document.getElementById('tip');

// Array de consejos
const tips = [
    "¿Ya te has preparado para el viaje? ¡Prepárate para la aventura!",
    "Recuerda que la paciencia es la clave para un buen viaje.",
    "Para ganar tienes que llenar el carton",
    "Observa el poderío de los dioses mientras la carga termina.",
    "Si no ganas, puedes perder",
];

let currentTipIndex = 0;

// Función para actualizar la barra de carga
function updateLoadingBar() {
    let progressWidth = 0;

    // Simula la carga
    const interval = setInterval(() => {
        progressWidth += 2; // Aumenta la barra en 5% cada 100ms

        if (progressWidth >= 200) {
            clearInterval(interval);
            loadingText.textContent = "¡Carga completa! ¡Comienza tu aventura!";
            // Aquí puedes redirigir a la página principal
            window.location.href = 'Inicio.html';
        } else {
            loadingBar.style.width = progressWidth + '%';
            loadingText.textContent = 'CARGANDO, POR FAVOR ESPERE';
            // Agrega una animación de progreso para la barra de carga
            loadingBar.style.transform = `scaleX(${progressWidth / 100})`;
            // Agrega una animación de entrada para la barra de carga
            loadingBar.style.opacity = 1;
            loadingBar.style.animation = 'entrada-barra 1s ease-out forwards';
        }
    }, 100);
}

// Función para rotar los consejos
function rotateTips() {
    currentTipIndex = (currentTipIndex + 1) % tips.length;
    loadingTip.textContent = tips[currentTipIndex];
    // Agrega una animación de rotación para los consejos
    loadingTip.style.transform = `rotate(${Math.random() * 360}deg)`;
    // Agrega una animación de entrada para el consejo
    loadingTip.style.opacity = 1;
    loadingTip.style.animation = 'entrada-consejo 1s ease-out forwards';
}

// Iniciar la carga
rotateTips(); // Mostrar el consejo
updateLoadingBar(); // Iniciar la barra de carga

// Rotar los consejos cada 3 segundos
setInterval(rotateTips, 2200);