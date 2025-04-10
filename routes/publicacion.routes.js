const express = require("express");
const router = express.Router();

const {
  getAllPublicaciones,
  postPublicacion,
  getPublicacionById,
} = require("../controllers/publicacion.controller");

router.get("/", getAllPublicaciones);

router.get("/:id", getPublicacionById);

router.post("/", postPublicacion);

module.exports = router;
