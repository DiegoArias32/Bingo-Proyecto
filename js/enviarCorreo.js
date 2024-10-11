// Obtener el formulario y el botón de enviar
const formulario = document.getElementById('formulario-contrasena');
const botonEnviar = formulario.querySelector('input[type="submit"]');
const errorMessage = document.getElementById('error-message'); // Asegúrate de que tengas un elemento con id "error-message"
const titulo = document.getElementById('titulo'); // Asegúrate de que tengas un elemento con id "titulo"

// Agregar evento de envío al formulario
formulario.addEventListener('submit', (e) => {
  e.preventDefault();

  // Obtener el correo electrónico del formulario
  const correo = formulario.querySelector('input[type="email"]').value;

  // Enviar la solicitud al servidor
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'php/enviarCorreo.php', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = () => {
    if (xhr.status === 200) {
      const response = xhr.responseText;
      if (response === 'Correo electrónico enviado con éxito') {
        errorMessage.textContent = 'Se ha enviado un correo electrónico con instrucciones para recuperar tu contraseña.';
        errorMessage.style.color = 'green';
        errorMessage.style.fontSize = '18px';
        titulo.appendChild(errorMessage);
        setTimeout(() => {
          window.location.href = 'Login.html';
        }, 2000);
      } else {
        errorMessage.textContent = response; // Display the error message from the server
        errorMessage.style.color = 'red';
        errorMessage.style.fontSize = '18px';
        titulo.appendChild(errorMessage);
      }
    }
  };
  xhr.send(JSON.stringify({ email: correo }));
});