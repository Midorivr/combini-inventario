/**
 * routes/inventario.js
 * ---------------------
 * Rutas del inventario del combini. Cada ruta delega en el controlador
 * (Escalabilidad: agregar un endpoint nuevo aqui no obliga a tocar
 * server.js ni el resto de las rutas existentes).
 */

const express = require("express");
const router = express.Router();
const controller = require("../controllers/inventarioController");

router.get("/", controller.listar);
router.get("/:id", controller.obtenerPorId);
router.post("/", controller.crear);
router.put("/:id", controller.actualizar);
router.delete("/:id", controller.eliminar);

module.exports = router;
