const multer = require("multer");
const path = require("path");

// Usamos memoryStorage para luego subir a Google Drive
const storage = multer.memoryStorage();

// ✅ Nuevas extensiones permitidas
const validExtensions = [
  ".mp4",
  ".mov",
  ".avi",
  ".pdf",
  ".jpg",
  ".jpeg",
  ".png",
  ".jfif",
];

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();

  if (validExtensions.includes(ext)) {
    cb(null, true);
  } else {
    console.warn(`❌ Archivo rechazado por extensión no permitida: ${ext}`);
    cb(new Error("Solo se permiten archivos de vídeo, imagen o PDF"));
  }
};

// Middleware de subida
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024, // Limite: 100MB
  },
});

module.exports = upload;
