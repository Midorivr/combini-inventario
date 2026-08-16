/**
 * tests/server.test.js
 * ----------------------
 * Suite de pruebas unitarias (Testeabilidad).
 * Corre con: npm test
 */

const request = require("supertest");
const app = require("../server");
const inventario = require("../data/inventario");

beforeEach(() => {
  inventario.resetProductos();
});

describe("GET /saludar", () => {
  it("responde 200 con el JSON exacto { saludo: 'Hola!' }", async () => {
    const res = await request(app).get("/saludar");
    expect(res.statusCode).toBe(200);
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.body).toEqual({ saludo: "Hola!" });
  });
});

describe("Rutas no definidas (404)", () => {
  it("responde 404 con contenido HTML", async () => {
    const res = await request(app).get("/ruta-que-no-existe");
    expect(res.statusCode).toBe(404);
    expect(res.headers["content-type"]).toMatch(/html/);
    expect(res.text).toContain("404");
  });
});

describe("GET /inventario", () => {
  it("responde 200 con un arreglo de productos", async () => {
    const res = await request(app).get("/inventario");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

describe("GET /inventario/:id", () => {
  it("responde 200 con el producto si existe", async () => {
    const res = await request(app).get("/inventario/1");
    expect(res.statusCode).toBe(200);
    expect(res.body.nombre).toBe("Ramyun picante");
  });

  it("responde 404 si el producto no existe", async () => {
    const res = await request(app).get("/inventario/999");
    expect(res.statusCode).toBe(404);
  });
});

describe("POST /inventario", () => {
  it("crea un producto nuevo y responde 201", async () => {
    const res = await request(app)
      .post("/inventario")
      .send({ nombre: "Cerveza Cass", categoria: "Bebidas", precio: 2000, stock: 20 });

    expect(res.statusCode).toBe(201);
    expect(res.body.nombre).toBe("Cerveza Cass");
    expect(res.body.id).toBeDefined();
  });

  it("responde 400 si faltan campos obligatorios", async () => {
    const res = await request(app)
      .post("/inventario")
      .send({ nombre: "Producto incompleto" });

    expect(res.statusCode).toBe(400);
  });
});

describe("PUT /inventario/:id", () => {
  it("actualiza el stock de un producto existente", async () => {
    const res = await request(app)
      .put("/inventario/2")
      .send({ stock: 50 });

    expect(res.statusCode).toBe(200);
    expect(res.body.stock).toBe(50);
  });

  it("responde 404 si el producto no existe", async () => {
    const res = await request(app).put("/inventario/999").send({ stock: 10 });
    expect(res.statusCode).toBe(404);
  });
});

describe("DELETE /inventario/:id", () => {
  it("elimina un producto existente", async () => {
    const res = await request(app).delete("/inventario/3");
    expect(res.statusCode).toBe(200);
    expect(res.body.mensaje).toBe("Producto eliminado");
  });

  it("responde 404 si el producto no existe", async () => {
    const res = await request(app).delete("/inventario/999");
    expect(res.statusCode).toBe(404);
  });
});
