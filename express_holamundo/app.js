const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");

const app = express();
app.use(express.json());

// 1. Configuración de SQLite (Base de datos ligera en un archivo)
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite", // Aquí se guardarán tus datos
});

// 2. Definición del Modelo (Cómo luce nuestra tabla)
const Tarea = sequelize.define("Tarea", {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  completada: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

// 3. Sincronizar con la base de datos al arrancar
sequelize.sync().then(() => console.log("BBDD conectada y lista"));

// --- RUTAS DE LA API ---

// GET: Leer de la base de datos
app.get("/tareas", async (req, res) => {
  const todas = await Tarea.findAll();
  res.json(todas);
});

// POST: Guardar en la base de datos
app.post("/tareas", async (req, res) => {
  const nueva = await Tarea.create({ titulo: req.body.titulo });
  res.status(201).json(nueva);
});

// DELETE: Borrar de la base de datos
app.delete("/tareas/:id", async (req, res) => {
  const borrado = await Tarea.destroy({ where: { id: req.params.id } });
  if (borrado) {
    res.json({ mensaje: "Eliminado de la base de datos" });
  } else {
    res.status(404).json({ mensaje: "No encontrado" });
  }
});

app.listen(3000, () => console.log("Servidor en http://localhost:3000"));
