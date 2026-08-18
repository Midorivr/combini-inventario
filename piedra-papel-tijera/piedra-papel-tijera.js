// piedra-papel-tijera.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const OPCIONES = ['piedra', 'papel', 'tijera'];

// Reglas: clave le gana a valor
const REGLAS = {
  piedra: 'tijera',
  papel: 'piedra',
  tijera: 'papel',
};

function elegirComputadora() {
  const indice = Math.floor(Math.random() * OPCIONES.length);
  return OPCIONES[indice];
}

function determinarGanador(jugador, computadora) {
  if (jugador === computadora) return 'empate';
  if (REGLAS[jugador] === computadora) return 'jugador';
  return 'computadora';
}

app.post('/jugar', (req, res) => {
  const { jugador } = req.body;

  if (!jugador || typeof jugador !== 'string') {
    return res.status(400).json({
      error: 'Debes enviar el campo "jugador" en el body.',
    });
  }

  const eleccionJugador = jugador.toLowerCase().trim();

  if (!OPCIONES.includes(eleccionJugador)) {
    return res.status(400).json({
      error: `Opción inválida. Debe ser una de: ${OPCIONES.join(', ')}`,
    });
  }

  const eleccionComputadora = elegirComputadora();
  const resultado = determinarGanador(eleccionJugador, eleccionComputadora);

  let mensaje;
  if (resultado === 'empate') {
    mensaje = '¡Empate!';
  } else if (resultado === 'jugador') {
    mensaje = '¡Ganaste!';
  } else {
    mensaje = 'Ganó la computadora.';
  }

  res.json({
    jugador: eleccionJugador,
    computadora: eleccionComputadora,
    resultado,
    mensaje,
  });
});

app.get('/opciones', (req, res) => {
  res.json({ opciones: OPCIONES });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});