/**
 * controllers/inventarioController.js
 * ------------------------------------
 * Contiene la logica de negocio del inventario, separada de las rutas
 * (Modificabilidad / Reutilizacion). Las rutas solo delegan aqui.
 */

const inventario = require("../data/inventario");

function listar(req, res) {
  res.status(200).json(inventario.getProductos());
}

function obtenerPorId(req, res) {
  const id = parseInt(req.params.id, 10);
  const producto = inventario.getProductos().find((p) => p.id === id);

  if (!producto) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }
  res.status(200).json(producto);
}

function crear(req, res) {
  const { nombre, categoria, precio, stock } = req.body || {};

  if (!nombre || precio === undefined || stock === undefined) {
    return res.status(400).json({
      error: "Faltan campos obligatorios: nombre, precio y stock"
    });
  }

  const nuevoProducto = {
    id: inventario.getNextId(),
    nombre,
    categoria: categoria || "Sin categoria",
    precio,
    stock
  };

  inventario.getProductos().push(nuevoProducto);
  res.status(201).json(nuevoProducto);
}

function actualizar(req, res) {
  const id = parseInt(req.params.id, 10);
  const producto = inventario.getProductos().find((p) => p.id === id);

  if (!producto) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  const { nombre, categoria, precio, stock } = req.body || {};
  if (nombre !== undefined) producto.nombre = nombre;
  if (categoria !== undefined) producto.categoria = categoria;
  if (precio !== undefined) producto.precio = precio;
  if (stock !== undefined) producto.stock = stock;

  res.status(200).json(producto);
}

function eliminar(req, res) {
  const id = parseInt(req.params.id, 10);
  const productos = inventario.getProductos();
  const index = productos.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  const [eliminado] = productos.splice(index, 1);
  res.status(200).json({ mensaje: "Producto eliminado", producto: eliminado });
}

module.exports = { listar, obtenerPorId, crear, actualizar, eliminar };
