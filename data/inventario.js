/**
 * data/inventario.js
 * -------------------
 * "Base de datos" en memoria para el inventario del combini.
 * En un proyecto real esto se reemplazaria por una conexion a una
 * base de datos (MongoDB, PostgreSQL, etc). Se mantiene en memoria
 * aqui para que el proyecto sea portable y no dependa de instalar
 * un motor de base de datos para poder correrlo o probarlo.
 */

let productos = [
  { id: 1, nombre: "Ramyun picante", categoria: "Fideos", precio: 1200, stock: 30 },
  { id: 2, nombre: "Soju original", categoria: "Bebidas", precio: 2500, stock: 15 },
  { id: 3, nombre: "Kimbap", categoria: "Comida preparada", precio: 3000, stock: 8 },
  { id: 4, nombre: "Snack Choco Pie", categoria: "Snacks", precio: 1800, stock: 25 }
];

let contadorId = 5;

function getProductos() {
  return productos;
}

function getNextId() {
  return contadorId++;
}

// Util para que los tests puedan resetear el estado entre pruebas
function resetProductos() {
  productos = [
    { id: 1, nombre: "Ramyun picante", categoria: "Fideos", precio: 1200, stock: 30 },
    { id: 2, nombre: "Soju original", categoria: "Bebidas", precio: 2500, stock: 15 },
    { id: 3, nombre: "Kimbap", categoria: "Comida preparada", precio: 3000, stock: 8 },
    { id: 4, nombre: "Snack Choco Pie", categoria: "Snacks", precio: 1800, stock: 25 }
  ];
  contadorId = 5;
}

module.exports = { getProductos, getNextId, resetProductos, productos };
