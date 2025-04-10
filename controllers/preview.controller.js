const Preview = require("../models/preview.model");

const getAllPreviews = async (req, res) => {
  try {
    const previews = await Preview.getAll();
    console.log("Obteniendo publicaciones:", previews);
    return res.json(previews);
  } catch (err) {
    console.error("Error obteniendo previews:", err.message);
    return res.status(500).json({ error: "Error obteniendo previews" });
  }
};

// Exportar los controladores
module.exports = {
  getAllPreviews,
};
