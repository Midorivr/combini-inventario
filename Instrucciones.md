# Combini Inventario API

API REST construida con **Node.js + Express** para gestionar el inventario de un combini (tienda de conveniencia coreana) Proyecto academico estructurado en torno a **Atributos de Calidad** del software

## Arquitectura

Ver `diagrama-arquitectura.svg` en la raiz del proyecto.

```
Cliente
   ↓
server.js (Express)
   ↓                              ↓
routes/saludar.js         routes/inventario.js
                                   ↓
                        controllers/inventarioController.js
                                   ↓
                             data/inventario.js
```

Cualquier ruta no reconocida cae en el manejador 404 definido en `server.js`, que responde HTML

## Requisitos previos

- [Node.js](https://nodejs.org/) version 18 o superior (incluye npm)
- Funciona igual en Windows, macOS y Linux

Puedes verificar tu version instalada con:

```bash
node -v
npm -v
```

## Instalacion

1. Clona el repositorio:
   ```bash
   git clone <URL-DEL-REPOSITORIO>
   cd combini-inventario
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```

## Ejecutar el servidor

```bash
npm start
```

Por defecto corre en `http://localhost:3000`. **Abre esa direccion en tu navegador para ver el panel visual del inventario** (pagina web con el listado de productos, formulario para agregar y boton para eliminar). Los endpoints `/saludar` e `/inventario` siguen devolviendo JSON puro por debajo

Si el puerto 3000 esta ocupado, puedes definir otro:

```bash
# Linux / macOS
PORT=4000 npm start

# Windows (PowerShell)
$env:PORT=4000; npm start
```

Modo desarrollo (recarga automatica con nodemon):

```bash
npm run dev
```

## Endpoints disponibles

| Metodo | Ruta               | Descripcion                          | Respuesta exitosa |
|--------|---------------------|----------------------------------------|--------------------|
| GET    | `/saludar`          | Endpoint de saludo (requisito base)   | `200` + `{ "saludo": "Hola!" }` |
| GET    | `/inventario`       | Lista todos los productos              | `200` + arreglo JSON |
| GET    | `/inventario/:id`   | Obtiene un producto por id             | `200` o `404` |
| POST   | `/inventario`       | Crea un producto nuevo                 | `201` o `400` |
| PUT    | `/inventario/:id`   | Actualiza un producto existente        | `200` o `404` |
| DELETE | `/inventario/:id`   | Elimina un producto                    | `200` o `404` |
| *      | Cualquier otra ruta | No encontrada                          | `404` + HTML |

### Ejemplo rapido con curl

```bash
curl http://localhost:3000/saludar

curl http://localhost:3000/inventario

curl -X POST http://localhost:3000/inventario \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Cerveza Cass","categoria":"Bebidas","precio":2000,"stock":20}'
```

## Personalizar la mascota / logo

El sitio ya tiene un espacio reservado para la mascota de la tienda (el circulo junto al nombre "Hikari Market"). Por ahora muestra un icono de reemplazo (🍙). Para poner la mascota real:

1. Guarda la imagen en `public/img/mascota.png`.
2. Recarga la pagina — se reemplaza sola, sin tocar codigo.

Mas detalles en `public/img/README.md`.

## Ejecutar las pruebas

El proyecto usa **Jest** + **Supertest** para pruebas automatizadas de los endpoints.

```bash
npm test
```

Las pruebas cubren:
- `/saludar` responde `200` con el JSON exacto esperado.
- Rutas inexistentes responden `404` con HTML.
- El CRUD completo de `/inventario` (listar, obtener, crear, actualizar, eliminar), incluyendo casos de error (`400`, `404`).

## Estructura del proyecto

```
combini-inventario/
├── server.js                     # Punto de entrada, monta rutas y manejo de errores
├── public/
│   ├── index.html                # Pagina web visual del inventario (estetica Hikari Market)
│   └── img/
│       └── README.md             # Como agregar la mascota/logo real
├── routes/
│   ├── saludar.js                # Ruta GET /saludar
│   └── inventario.js             # Rutas CRUD de /inventario
├── controllers/
│   └── inventarioController.js   # Logica de negocio del inventario
├── data/
│   └── inventario.js             # Almacen de datos en memoria
├── tests/
│   └── server.test.js            # Pruebas unitarias (Jest + Supertest)
├── diagrama-arquitectura.svg     # Diagrama de arquitectura
├── package.json
└── README.md
```

## Atributos de Calidad cubiertos

| Atributo | Como se cumple |
|---|---|
| Funcionalidad | Endpoints `/saludar` y CRUD de `/inventario` implementados y probados |
| Usabilidad | README claro + diagrama de arquitectura |
| Rendimiento | Datos en memoria, sin I/O bloqueante, respuestas livianas |
| Disponibilidad y Seguridad | Codigos HTTP correctos, manejador de errores centralizado que evita caidas del servidor |
| Portabilidad | Solo depende de Node.js; funciona igual en Windows/macOS/Linux |
| Testeabilidad | Suite de pruebas automatizada con Jest + Supertest |
| Modificabilidad y Reutilizacion | Estructura modular (routes / controllers / data separados) |
| Escalabilidad | Agregar un endpoint nuevo solo requiere: 1 archivo de ruta + 1 metodo de controlador, sin tocar `server.js` |

## Autor

Proyecto desarrollado para practicar Atributos de Calidad de software, aplicado al inventario de un combini real.
