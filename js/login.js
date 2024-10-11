const form = document.getElementById('formulario-login');
const errorMessage = document.getElementById('error-message');
const titulo = document.querySelector('.titulo');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username === '' || password === '') {
    errorMessage.textContent = 'Por favor, ingrese su usuario y contraseña';
    errorMessage.style.color = 'red';
    titulo.appendChild(errorMessage);
    return;
  }

  // Enviar el formulario a PHP para procesar
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'php/login.php', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send(`username=${username}&password=${password}`);

  xhr.onload = () => {
    if (xhr.status === 200) {
      const response = xhr.responseText;
      if (response === 'Inicio de sesión exitoso!') {
        errorMessage.textContent = response;
        errorMessage.style.color = 'green';
        errorMessage.style.fontSize = '20px';
        titulo.appendChild(errorMessage);
        setTimeout(() => {
          window.location.href = 'cargaInicio.html';
        }, 2000);
      } else {
        errorMessage.textContent = response;
        errorMessage.style.color = 'red';
        errorMessage.style.fontSize = '20px';
        titulo.appendChild(errorMessage);
      }
    } else {
      errorMessage.textContent = 'Error al iniciar sesión';
      errorMessage.style.color = 'red';
      errorMessage.style.fontSize = '20px';
      titulo.appendChild(errorMessage);
    }
  };
});