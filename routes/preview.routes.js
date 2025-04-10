const express = require("express");
const router = express.Router();

const { getAllPreviews } = require("../controllers/preview.controller");

router.get("/", getAllPreviews);

module.exports = router;
