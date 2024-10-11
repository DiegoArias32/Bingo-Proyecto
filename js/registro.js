const form = document.getElementById('formulario-registro');
const errorMessage = document.getElementById('error-message');
const titulo = document.querySelector('.titulo');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm_password').value;

  if (password !== confirmPassword) {
    errorMessage.textContent = 'La contraseña y la confirmación de la contraseña no coinciden';
    errorMessage.style.color = 'red';
    titulo.appendChild(errorMessage);
    return;
  }

  // Enviar el formulario a PHP para procesar
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'php/registro.php', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send(`username=${username}&email=${email}&password=${password}`);

  xhr.onload = () => {
    if (xhr.status === 200) {
      const response = xhr.responseText;
      if (response === 'Registro exitoso!') {
        errorMessage.textContent = response;
        errorMessage.style.color = 'green';
        errorMessage.style.fontSize = '20px';
        titulo.appendChild(errorMessage);
        setTimeout(() => {
          window.location.href = 'Login.html';
        }, 2000);
      } else {
        errorMessage.textContent = response;
        errorMessage.style.color = 'red';
        errorMessage.style.fontSize = '20px';
        titulo.appendChild(errorMessage);
      }
    } else {
      errorMessage.textContent = 'Error al registrar el usuario';
      errorMessage.style.color = 'red';
      errorMessage.style.fontSize = '20px';
      titulo.appendChild(errorMessage);
    }
  };
});