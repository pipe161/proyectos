// 1. Importamos el módulo HTTP que viene incluido en Node.js
const http = require("http");

// 2. Definimos la dirección y el puerto donde vivirá el servidor
const hostname = "127.0.0.1"; // Tu propia computadora (localhost)
const port = 3000;

// 3. Creamos el servidor
const server = http.createServer((req, res) => {
  // Configuramos la respuesta: estado 200 (OK) y tipo de contenido texto
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");

  // El mensaje que verá el usuario en el navegador
  res.end("¡Hola desde Node.js! Este es un servidor real.");
});

// 4. Ponemos al servidor a "escuchar" peticiones
server.listen(port, hostname, () => {
  console.log(`Servidor corriendo en http://${hostname}:${port}/`);
});
