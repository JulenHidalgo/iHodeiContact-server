require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "*", // Permitir acceso desde cualquier dominio
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Métodos permitidos
    allowedHeaders: ["Content-Type", "Authorization"], // Cabeceras permitidas
  })
);

app.use(express.json());

const contenidoRoutes = require("./routes/contenido.routes");
app.use("/contenido", contenidoRoutes);

const publicacionRoutes = require("./routes/publicacion.routes");
app.use("/publicacion", publicacionRoutes);

const previewRoutes = require("./routes/preview.routes");
app.use("/preview", previewRoutes);

app.get("/", (req, res) => {
  res.json({ mensaje: "Servidor funcionando correctamente" });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
