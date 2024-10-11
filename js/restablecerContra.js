const form = document.getElementById('formulario-restablecer');
const errorMessage = document.getElementById('error-message');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const password = document.getElementById('password').value;

  // Enviar el formulario a PHP para procesar
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'restablecer_contraseña.php', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send(`password=${password}`);

  xhr.onload = () => {
    if (xhr.status === 200) {
      const response = xhr.responseText;
      if (response === 'La contraseña ha sido actualizada correctamente.') {
        errorMessage.textContent = response;
        errorMessage.style.color = 'green';
        errorMessage.style.fontSize = '20px';
        setTimeout(() => {
          window.location.href = 'Login.html';
        }, 2000);
      } else {
        errorMessage.textContent = response;
        errorMessage.style.color = 'red';
        errorMessage.style.fontSize = '20px';
      }
    } else {
      errorMessage.textContent = 'Error al restablecer la contraseña';
      errorMessage.style.color = 'red';
      errorMessage.style.fontSize = '20px';
    }
  };
});