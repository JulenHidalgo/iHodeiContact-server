const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const {
  getContenidoByIdPublicacion,
  postContenido,
} = require("../controllers/contenido.controller");

router.get("/:publicacion_id", getContenidoByIdPublicacion);

router.post("/", upload.single("archivo"), postContenido);

module.exports = router;
