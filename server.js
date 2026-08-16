/**
 * server.js
 * ---------
 * Punto de entrada del servidor. Arma la app de Express, monta las
 * rutas y define el manejo de errores/404. La logica de cada ruta
 * vive en /routes y /controllers (estructura modular).
 */

const express = require("express");
const app = express();

app.use(express.json());

// --- Frontend: pagina visual del combini (usa /saludar y /inventario) ---
app.use(express.static(require("path").join(__dirname, "public")));

// --- Rutas ---
const saludarRoutes = require("./routes/saludar");
const inventarioRoutes = require("./routes/inventario");

app.use("/saludar", saludarRoutes);
app.use("/inventario", inventarioRoutes);

// --- Manejo de rutas no definidas (404 en HTML) ---
app.use((req, res) => {
  res.status(404).send(`<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>404 Not Found</title>
</head>
<body style="font-family: sans-serif; text-align: center; margin-top: 80px;">
  <h1>404 Not Found</h1>
  <p>La ruta <strong>${req.originalUrl}</strong> no existe en este servidor.</p>
  <p><a href="/saludar">Volver a /saludar</a></p>
</body>
</html>`);
});

// --- Manejo centralizado de errores para que el servidor no se caiga ---
// (Disponibilidad y Seguridad: cualquier excepcion no controlada en una
// ruta cae aqui en vez de tumbar el proceso de Node).
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Error interno del servidor" });
});

const PORT = process.env.PORT || 3000;

// Solo levanta el servidor si el archivo se ejecuta directamente,
// no cuando lo importan los tests (asi los tests no chocan de puerto).
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}

module.exports = app;
