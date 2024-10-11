// Simulación de datos de configuración (se podría obtener de un archivo JSON o base de datos)
let config = {
    language: "",
    voices: true,
    sounds: true
  };
  
  // Obtener elementos del DOM
  const currentLang = document.getElementById('currentLang');
  const prevLangBtn = document.getElementById('prevLang');
  const nextLangBtn = document.getElementById('nextLang');
  const voicesCheckbox = document.getElementById('voices');
  const soundsCheckbox = document.getElementById('sounds');
  const logoutBtn = document.getElementById('logout');
  const buttonVolver = document.querySelector('.button-volver');
  
  // Eventos
  prevLangBtn.addEventListener('click', () => {
    // Cambiar idioma previo
    config.language = "Spanish";
    currentLang.textContent = config.language;
  });
  
  nextLangBtn.addEventListener('click', () => {
    // Cambiar idioma siguiente
    config.language = "French";
    currentLang.textContent = config.language;
  });
  
  voicesCheckbox.addEventListener('change', () => {
    // Actualizar configuración de voces
    config.voices = voicesCheckbox.checked;
  });
  
  soundsCheckbox.addEventListener('change', () => {
    // Actualizar configuración de sonidos
    config.sounds = soundsCheckbox.checked;
  });
  
  logoutBtn.addEventListener('click', () => {
    if (confirm("¿Estás seguro de que deseas cerrar la sesión?")) {
      fetch('php/logout.php')
        .then(response => response.text())
        .then(() => {
          window.location.href = 'login.html';
        });
    }
  });
  
  buttonVolver.addEventListener('click', () => {
    // Redirigir a la página de inicio
    window.location.href = 'Inicio.html';

    
  });