const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname));

/**
 * Función auxiliar recursiva para buscar en todos los ficheros JSON dentro de /data
 */
function buscarEnTodosLosArchivos(dir, key, field, value) {
  if (!fs.existsSync(dir)) return null;
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // Búsqueda recursiva en subcarpetas (YYYY/MM/DD)
      const resultado = buscarEnTodosLosArchivos(fullPath, key, field, value);
      if (resultado) return resultado;
    } else if (file.toUpperCase().endsWith(".JSON")) {
      try {
        const content = JSON.parse(fs.readFileSync(fullPath, "utf8"));
        if (content[key] && Array.isArray(content[key])) {
          const encontrado = content[key].find((item) => item[field] === value);
          if (encontrado) return encontrado;
        }
      } catch (e) {
        console.error(`Error leyendo ${file}:`, e);
      }
    }
  }
  return null;
}

// --- ENDPOINT BUSCAR FUNCIONARIO ---
app.get("/buscar-funcionario", (req, res) => {
  const { cp } = req.query;
  if (!cp) return res.status(400).json({ error: "Falta CP" });

  const baseDir = path.join(__dirname, "data");
  const funcionario = buscarEnTodosLosArchivos(
    baseDir,
    "funcionarios",
    "cp",
    cp,
  );

  if (funcionario) {
    res.json(funcionario);
  } else {
    res.status(404).json({ mensaje: "Funcionario no encontrado" });
  }
});

// --- ENDPOINT BUSCAR IDENTIFICADO ---
app.get("/buscar-identificado", (req, res) => {
  const { doc } = req.query;
  if (!doc) return res.status(400).json({ error: "Falta documento" });

  const baseDir = path.join(__dirname, "data");
  const identificado = buscarEnTodosLosArchivos(
    baseDir,
    "filiacion",
    "documento",
    doc,
  );

  if (identificado) {
    res.json(identificado);
  } else {
    res.status(404).json({ mensaje: "Identificado no encontrado" });
  }
});

// --- RUTA PARA GUARDAR CON LÓGICA DE ACTUALIZACIÓN ---
// --- RUTA PARA GUARDAR CON LÓGICA DE ACTUALIZACIÓN ---
app.post("/guardar-parte", (req, res) => {
  const data = req.body;

  // Extraemos la fecha del JSON recibido (formato YYYY-MM-DD)
  // Si por algún motivo no viniera, usamos la de hoy como fallback de seguridad
  const fechaReferencia = data.fecha || new Date().toISOString().split("T")[0];
  const [yyyy, mm, dd] = fechaReferencia.split("-");
  const fechaString = `${yyyy}-${mm}-${dd}`;

  const baseDir = path.join(__dirname, "data");
  const targetDir = path.join(baseDir, yyyy, mm, dd);

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const fileName = `${fechaString}_${data.turno}_${data.indicativo}.json`
    .toUpperCase()
    .replace(/\s+/g, "_");
  const filePath = path.join(targetDir, fileName);

  // Lógica: Solo devolvemos error 409 si es un intento de "alta" (solo datos básicos)
  const camposBasicos = ["fecha", "turno", "indicativo", "vehiculo"];
  const llavesEnviadas = Object.keys(data);
  const esIntentoCreacion = llavesEnviadas.every((key) =>
    camposBasicos.includes(key),
  );

  if (fs.existsSync(filePath) && esIntentoCreacion) {
    return res.status(409).json({
      error: "El fichero ya existe",
      mensaje: "No se puede sobreescribir un parte de servicio ya creado.",
    });
  }

  // Si no es creación simple o el archivo no existe, guardamos (actualizamos)
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  res.json({
    mensaje: "Parte guardado correctamente",
    nombreArchivo: fileName,
  });
});

// --- RUTA PARA OBTENER UN PARTE ESPECÍFICO (Carga los datos al editar) ---
app.get("/obtener-parte", (req, res) => {
  const { yyyy, mm, dd, turno, indicativo } = req.query;
  const fileName = `${yyyy}-${mm}-${dd}_${turno}_${indicativo}.json`
    .toUpperCase()
    .replace(/\s+/g, "_");
  const filePath = path.join(__dirname, "data", yyyy, mm, dd, fileName);

  if (fs.existsSync(filePath)) {
    const contenido = fs.readFileSync(filePath, "utf8");
    res.json(JSON.parse(contenido));
  } else {
    res.status(404).json({ error: "Archivo no encontrado" });
  }
});

// --- RUTA PARA RECUPERAR TODOS LOS PARTES DE UN DÍA (Lista en Inicio) ---
// La ruta que usa tu inicio.html es /recuperar-ficheros
app.get("/recuperar-ficheros", (req, res) => {
  const { yyyy, mm, dd } = req.query;
  const targetDir = path.join(__dirname, "data", yyyy, mm, dd);

  if (!fs.existsSync(targetDir)) {
    return res.json([]);
  }

  try {
    const archivos = fs.readdirSync(targetDir);
    const archivosJson = archivos.filter((f) =>
      f.toUpperCase().endsWith(".JSON"),
    );
    const contenidos = archivosJson.map((archivo) => {
      return JSON.parse(fs.readFileSync(path.join(targetDir, archivo), "utf8"));
    });
    res.json(contenidos);
  } catch (err) {
    res.status(500).json({ error: "Error al leer ficheros del día" });
  }
});

// Alias adicional por si el cliente solicita /obtener-partes
app.get("/obtener-partes", (req, res) => {
  // Redirige a la misma lógica de recuperar-ficheros
  const { yyyy, mm, dd } = req.query;
  const targetDir = path.join(__dirname, "data", yyyy, mm, dd);
  if (!fs.existsSync(targetDir)) return res.json([]);
  try {
    const archivos = fs
      .readdirSync(targetDir)
      .filter((f) => f.toUpperCase().endsWith(".JSON"));
    const contenidos = archivos.map((f) =>
      JSON.parse(fs.readFileSync(path.join(targetDir, f), "utf8")),
    );
    res.json(contenidos);
  } catch (e) {
    res.status(500).json({ error: "Error al recuperar partes" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor GOR corriendo en http://localhost:${PORT}`);
});

// --- ENDPOINT OBTENER PARTES POR FECHA Y TURNO ---
app.get("/obtener-partes-turno", (req, res) => {
  const { fecha, turno } = req.query; // fecha: YYYY-MM-DD, turno: MAÑANA/TARDE/NOCHE
  if (!fecha || !turno)
    return res.status(400).json({ error: "Faltan parámetros" });

  const [yyyy, mm, dd] = fecha.split("-");
  const targetDir = path.join(__dirname, "data", yyyy, mm, dd);

  if (!fs.existsSync(targetDir)) return res.json([]);

  try {
    const archivos = fs
      .readdirSync(targetDir)
      .filter((f) => f.toUpperCase().endsWith(".JSON"));
    const partes = archivos
      .map((f) => JSON.parse(fs.readFileSync(path.join(targetDir, f), "utf8")))
      .filter((p) => p.turno.toUpperCase() === turno.toUpperCase());

    res.json(partes);
  } catch (err) {
    res.status(500).json({ error: "Error al leer los partes" });
  }
});
