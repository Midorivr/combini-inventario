/**
 * routes/saludar.js
 * ------------------
 * Ruta requerida por la tarea. Responde SIEMPRE 200 OK con el JSON exacto
 * { "saludo": "Hola!" }
 */

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ saludo: "Hola!" });
});

module.exports = router;
