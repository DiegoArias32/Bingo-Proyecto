document.getElementById('formulario-contrasena').addEventListener('submit', function(event) {
    event.preventDefault(); // prevent form submission
    var successMessage = document.getElementById('success-message');
    successMessage.style.display = 'block'; // show the success message
    setTimeout(function() {
      successMessage.style.display = 'none'; // hide the success message after 3 seconds
    }, 3000);
    setTimeout(function() {
      window.location.href = 'Login 1.html'; // redirect to Login 1.html after 20 seconds
    }, 4000);
  });