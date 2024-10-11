/**
 * Proyecto Bingo
 * autores: Diego De Jesus Arias Gonzalez
 * Santiago Gonzalez Vasquez
 * Juan Esteban Huertas
 * fecha: 27 de junio de 2024
 */
let numerosGenerados = [];
let carton = [];

// Inicializar cartón con números aleatorios
inicializarCarton();

function inicializarCarton() {
  const celdasB = document.querySelectorAll('.B');
  const celdasI = document.querySelectorAll('.I');
  const celdasN = document.querySelectorAll('.N');
  const celdasG = document.querySelectorAll('.G');
  const celdasO = document.querySelectorAll('.O');

  celdasB.forEach(celda => {
    let numero;
    do {
      numero = Math.floor(Math.random() * 15) + 1;
    } while (carton.includes(numero));
    celda.innerHTML = `<p>${numero}</p>`;
    celda.addEventListener('click', function() {
      if (numerosGenerados.includes(numero)) {
        this.classList.add('tachado');
        verificarBingo();
      }
    });
    carton.push(numero);
  });

  celdasI.forEach(celda => {
    let numero;
    do {
      numero = Math.floor(Math.random() * 15) + 16;
    } while (carton.includes(numero));
    celda.innerHTML = `<p>${numero}</p>`;
    celda.addEventListener('click', function() {
      if (numerosGenerados.includes(numero)) {
        this.classList.add('tachado');
        verificarBingo();
      }
    });
    carton.push(numero);
  });

  celdasN.forEach(celda => {
    let numero;
    do {
      numero = Math.floor(Math.random() * 15) + 31;
    } while (carton.includes(numero));
    celda.innerHTML = `<p>${numero}</p>`;
    celda.addEventListener('click', function() {
      if (numerosGenerados.includes(numero)) {
        this.classList.add('tachado');
        verificarBingo();
      }
    });
    carton.push(numero);
  });

  celdasG.forEach(celda => {
    let numero;
    do {
      numero = Math.floor(Math.random() * 15) + 46;
    } while (carton.includes(numero));
    celda.innerHTML = `<p>${numero}</p>`;
    celda.addEventListener('click', function() {
      if (numerosGenerados.includes(numero)) {
        this.classList.add('tachado');
        verificarBingo();
      }
    });
    carton.push(numero);
  });

  celdasO.forEach(celda => {
    let numero;
    do {
      numero = Math.floor(Math.random() * 15) + 61;
    } while (carton.includes(numero));
    celda.innerHTML = `<p>${numero}</p>`;
    celda.addEventListener('click', function() {
      if (numerosGenerados.includes(numero)) {
        this.classList.add('tachado');
        verificarBingo();
      }
    });
    carton.push(numero);
  });
}

function generarNumero() {
  let numero;
  do {
    numero = Math.floor(Math.random() * 75) + 1;
  } while (numerosGenerados.includes(numero));
  numerosGenerados.push(numero);

  let letra;
  if (numero >= 1 && numero <= 15) {
    letra = 'B';
  } else if (numero >= 16 && numero <= 30) {
    letra = 'I';
  } else if (numero >= 31 && numero <= 45) {
    letra = 'N';
  } else if (numero >= 46 && numero <= 60) {
    letra = 'G';
  } else {
    letra = 'O';
  }

  const respuestaId = `respuesta-${letra}`;
  const respuesta = document.getElementById(respuestaId);
  const speechId = `speech-${letra}`;
  const speech = document.getElementById(speechId);
  const elementoLista = document.createElement('li');
  elementoLista.innerHTML = `<span>${letra}</span> <span>${numero}</span>`;
  respuesta.appendChild(elementoLista);

  // Sintetizar voz
  const utterance = new SpeechSynthesisUtterance(`${letra} ${numero}`);
  const synth = window.speechSynthesis; // Obtener el objeto SpeechSynthesis
  synth.speak(utterance); // Utilizar el objeto SpeechSynthesis para hablar


  console.log('Número generado:', numero);
}

document.getElementById('play-button').addEventListener('click', () => {
  intervalId = setInterval(generarNumero, 3000);
  document.getElementById('play-button').disabled = true;
  document.getElementById('stop-button').disabled = false;
});

document.getElementById('stop-button').addEventListener('click', () => {
  clearInterval(intervalId);
  document.getElementById('play-button').disabled = false;
  document.getElementById('stop-button').disabled = true;

});


function verificarBingo() {
  const celdasCarton = document.querySelectorAll('.B,.I,.N,.G,.O');
  let todasTachadas = true;
  celdasCarton.forEach(celda => {
    if (!celda.classList.contains('tachado')) {
      todasTachadas = false;
    }
  });
  if (todasTachadas) {
    alert('BINGO!!');
    reproducirCancion();
    gritarBingo();
  }
}

function reproducirCancion() {
  const audio = new Audio("./music/prueba.mp3"); // reemplaza con la ruta del archivo de audio
  audio.volume = 0.2; // Ajusta el volumen de la música (0.0 - 1.0)
  audio.play();
}

function gritarBingo() {
  const utterance = new SpeechSynthesisUtterance('BINGO, REPITO BINGO!!');
  utterance.pitch = 1.5;
  utterance.rate = 1.2;
  utterance.volume = 1.0; // Ajusta el volumen de la voz (0.0 - 1.0)
  window.speechSynthesis.speak(utterance);
}
