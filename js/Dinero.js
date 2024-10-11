let monedas = 0;

function updateMonedas(cantidad) {
  monedas += cantidad;
  document.getElementById("monedas").innerHTML = `Monedas: ${monedas}`;
}

// Llamamos a la función updateMonedas cuando se gana o pierde monedas
function ganarMonedas() {
  updateMonedas(10); // Aumentamos el contador en 10 monedas
}

function perderMonedas() {
  if (monedas <= 0) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No tienes suficientes monedas para perder más.'
    });
  } else {
    updateMonedas(-5); // Disminuimos el contador en 5 monedas
  }
}