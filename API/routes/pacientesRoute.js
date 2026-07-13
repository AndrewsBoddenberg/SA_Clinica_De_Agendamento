const express = require("express");
const router = express.Router();

const pacientesController = require("../controllers/pacientesController");

router.get("/", pacientesController.getPacientes);
router.get("/:id", pacientesController.getPacientesById);
router.post("/", pacientesController.createPacientes);
router.put("/:id", pacientesController.updatePacientes);
router.delete("/:id", pacientesController.deletePacientes);

module.exports = router;