const express = require("express");
const router = express.Router();

const medicosController = require("../controllers/medicoController");

router.get("/", medicosController.getMedicos);
router.get("/:id", medicosController.getMedicosById);
router.post("/", medicosController.createMedicos);
router.put("/:id", medicosController.updateMedicos);
router.delete("/:id", medicosController.deleteMedicos);

module.exports = router;