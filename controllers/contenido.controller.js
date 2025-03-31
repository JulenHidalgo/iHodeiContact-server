const Contenido = require("../models/contenido.model");
const fs = require("fs");
const path = require("path");
const { google } = require("googleapis");
const streamifier = require("streamifier");

// Autenticación con token y credenciales
const auth = new google.auth.OAuth2();
auth.setCredentials(JSON.parse(process.env.GOOGLE_TOKEN));
const drive = google.drive({ version: "v3", auth });

const postContenido = async (req, res) => {
  try {
    const { publicacion_id, tipoContenido } = req.body;
    const archivo = req.file;

    // Validaciones
    if (!archivo || !publicacion_id || !tipoContenido) {
      return res.status(400).json({ error: "Faltan datos en la solicitud" });
    }

    const tiposValidos = ["PDF", "IMG", "VID"];
    if (!tiposValidos.includes(tipoContenido)) {
      return res.status(400).json({ error: "Tipo de contenido no válido" });
    }

    console.log("📦 Subiendo archivo a Google Drive...");

    const drive = google.drive({ version: "v3", auth });

    const response = await drive.files.create({
      requestBody: {
        name: archivo.originalname,
        mimeType: archivo.mimetype,
      },
      media: {
        mimeType: archivo.mimetype,
        body: Buffer.from(archivo.buffer),
      },
    });

    const fileId = response.data.id;

    console.log("✅ Archivo subido a Drive con ID:", fileId);

    // Guardar en base de datos
    const nuevoContenido = {
      publicacion_id,
      tipoContenido,
      archivo: fileId, // Este es el ID en Google Drive
    };

    const resultado = await Contenido.crear(nuevoContenido);

    res.status(200).json({
      mensaje: "Contenido guardado correctamente",
      contenido: resultado,
    });
  } catch (err) {
    console.error("❌ Error al subir contenido:", err.message);
    res.status(500).json({ error: "Error interno al subir contenido" });
  }
};

const getContenidoByIdPublicacion = async (req, res) => {
  try {
    const { publicacion_id } = req.params;

    const contenidos = await Contenido.getAllFromPublicacion(publicacion_id);

    if (!contenidos || contenidos.length === 0) {
      console.log("No se encontraron contenidos para esta publicacion");
      return res
        .status(404)
        .json({ error: "No se encontraron contenidos para esta publicacion" });
    }

    console.log("Obteniendo contenido de publicacion:", contenidos);
    return res.status(200).json(contenidos);
  } catch (err) {
    console.error("Error obteniendo contenido de publicacion:", err.message);
    return res
      .status(500)
      .json({ error: "Error obteniendo contenido de publicacion" });
  }
};

// Exportar los controladores
module.exports = {
  getContenidoByIdPublicacion,
  postContenido,
};
