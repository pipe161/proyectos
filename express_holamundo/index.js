const express = require("express");
const app = express();
const port = 3000;

// Esto permite que nuestra API entienda datos en formato JSON
app.use(express.json());

// Simulamos una "Base de Datos" en memoria
let tareas = [
  { id: 1, titulo: "Aprender Node.js", completada: false },
  { id: 2, titulo: "Configurar Express", completada: true },
];

// RUTA GET: Listar todas las tareas
app.get("/tareas", (req, res) => {
  res.json(tareas);
});

// RUTA POST: Crear una nueva tarea
app.post("/tareas", (req, res) => {
  const nuevaTarea = {
    id: tareas.length + 1,
    titulo: req.body.titulo,
    completada: false,
  };
  tareas.push(nuevaTarea);
  res.status(201).json(nuevaTarea);
});

app.listen(port, () => {
  console.log(`🚀 API REST activa en http://localhost:${port}`);
});
